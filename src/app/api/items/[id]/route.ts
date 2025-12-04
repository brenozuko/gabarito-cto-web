import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { updateItemSchema } from "~/server/api/schemas";
import { db } from "~/server/db";
import { items } from "~/server/db/schema";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const itemId = Number.parseInt(id, 10);

    if (Number.isNaN(itemId)) {
      return NextResponse.json({ error: "ID de item inválido" }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = updateItemSchema.parse(body);

    const updateData: {
      name?: string;
      description?: string | null;
      xp?: number;
      order?: number;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    if (validatedData.name !== undefined) {
      updateData.name = validatedData.name;
    }
    if (validatedData.description !== undefined) {
      updateData.description = validatedData.description ?? null;
    }
    if (validatedData.xp !== undefined) {
      updateData.xp = validatedData.xp;
    }
    if (validatedData.order !== undefined) {
      updateData.order = validatedData.order;
    }

    const [updatedItem] = await db
      .update(items)
      .set(updateData)
      .where(eq(items.id, itemId))
      .returning();

    if (!updatedItem) {
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados de entrada inválidos", details: error },
        { status: 400 },
      );
    }
    console.error("Error updating item:", error);
    return NextResponse.json(
      { error: "Falha ao atualizar item" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const itemId = Number.parseInt(id, 10);

    if (Number.isNaN(itemId)) {
      return NextResponse.json({ error: "ID de item inválido" }, { status: 400 });
    }

    const [deletedItem] = await db
      .delete(items)
      .where(eq(items.id, itemId))
      .returning();

    if (!deletedItem) {
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item excluído com sucesso" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Falha ao excluir item" },
      { status: 500 },
    );
  }
}
