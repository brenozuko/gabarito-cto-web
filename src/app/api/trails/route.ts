import { NextRequest, NextResponse } from "next/server";
import { createTrailSchema } from "~/server/api/schemas";
import { db } from "~/server/db";
import { trails } from "~/server/db/schema";

export async function GET() {
  try {
    const allTrails = await db.select().from(trails);
    return NextResponse.json(allTrails);
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

    const [newTrail] = await db
      .insert(trails)
      .values({
        name: validatedData.name,
        description: validatedData.description ?? null,
      })
      .returning();

    return NextResponse.json(newTrail, { status: 201 });
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
