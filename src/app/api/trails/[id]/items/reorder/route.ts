import { and, eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { reorderItemsSchema } from "~/server/api/schemas";
import { db } from "~/server/db";
import { items } from "~/server/db/schema";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const trailId = Number.parseInt(id, 10);

    if (Number.isNaN(trailId)) {
      return NextResponse.json(
        { error: "ID de trilha inválido" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = reorderItemsSchema.parse(body);

    // Verifica se todos os itens pertencem à trilha
    const itemIds = validatedData.itemOrders.map((io) => io.id);
    const existingItems = await db
      .select()
      .from(items)
      .where(
        and(eq(items.trailId, trailId), inArray(items.id, itemIds))
      );

    if (existingItems.length !== itemIds.length) {
      return NextResponse.json(
        { error: "Um ou mais itens não pertencem a esta trilha" },
        { status: 400 }
      );
    }

    // Atualiza a ordem de cada item
    const updatePromises = validatedData.itemOrders.map(({ id: itemId, order }) =>
      db
        .update(items)
        .set({ order, updatedAt: new Date() })
        .where(eq(items.id, itemId))
    );

    await Promise.all(updatePromises);

    // Retorna os itens atualizados
    const updatedItems = await db
      .select()
      .from(items)
      .where(eq(items.trailId, trailId));

    return NextResponse.json(updatedItems);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados de entrada inválidos", details: error },
        { status: 400 }
      );
    }
    console.error("Error reordering items:", error);
    return NextResponse.json(
      { error: "Falha ao reordenar itens" },
      { status: 500 }
    );
  }
}

