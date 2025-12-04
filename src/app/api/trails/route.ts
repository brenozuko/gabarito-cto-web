import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { createTrailSchema } from "~/server/api/schemas";
import { db } from "~/server/db";
import { items, trails } from "~/server/db/schema";

export async function GET() {
  try {
    const allTrails = await db.select().from(trails);

    const trailsWithProgress = await Promise.all(
      allTrails.map(async (trail) => {
        const trailItems = await db
          .select()
          .from(items)
          .where(eq(items.trailId, trail.id));

        const completedItems = trailItems.filter((item) => item.completed);
        const progress =
          trailItems.length > 0
            ? (completedItems.length / trailItems.length) * 100
            : 0;
        const maxXp = trailItems.reduce((acc, item) => acc + item.xp, 0);

        return {
          ...trail,
          progress,
          completedItems: completedItems.length,
          totalItems: trailItems.length,
          maxXp,
        };
      }),
    );

    return NextResponse.json(trailsWithProgress);
  } catch (error) {
    console.error("Error fetching trails:", error);
    return NextResponse.json(
      { error: "Falha ao buscar trilhas" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createTrailSchema.parse(body);

    const result = await db.transaction(async (tx) => {
      // Criar a trilha
      const [newTrail] = await tx
        .insert(trails)
        .values({
          name: validatedData.name,
          description: validatedData.description ?? null,
        })
        .returning();

      // Criar os itens se fornecidos
      let createdItems: typeof items.$inferSelect[] = [];
      if (validatedData.items && validatedData.items.length > 0) {
        createdItems = await tx
          .insert(items)
          .values(
            validatedData.items.map((item) => ({
              trailId: newTrail?.id ?? 0,
              name: item.name,
              xp: item.xp ?? 10,
              order: item.order ?? 0,
            }))
          )
          .returning();
      }

      return { trail: newTrail, items: createdItems };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados de entrada inválidos", details: error },
        { status: 400 },
      );
    }
    console.error("Error creating trail:", error);
    return NextResponse.json(
      { error: "Falha ao criar trilha" },
      { status: 500 },
    );
  }
}
