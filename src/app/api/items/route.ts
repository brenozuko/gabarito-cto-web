import { NextRequest, NextResponse } from "next/server";
import { createItemSchema } from "~/server/api/schemas";
import { db } from "~/server/db";
import { items } from "~/server/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createItemSchema.parse(body);

    const [newItem] = await db
      .insert(items)
      .values({
        trailId: validatedData.trailId,
        name: validatedData.name,
        xp: validatedData.xp ?? 10,
        order: validatedData.order ?? 0,
      })
      .returning();

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados de entrada inválidos", details: error },
        { status: 400 },
      );
    }
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Falha ao criar item" },
      { status: 500 },
    );
  }
}
