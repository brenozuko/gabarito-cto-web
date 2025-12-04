import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { updateTrailSchema } from "~/server/api/schemas";
import { db } from "~/server/db";
import { items, trails } from "~/server/db/schema";

async function getTrailWithProgress(trailId: number) {
  const [trail] = await db
    .select()
    .from(trails)
    .where(eq(trails.id, trailId))
    .limit(1);

  if (!trail) {
    return null;
  }

  const trailItems = await db
    .select()
    .from(items)
    .where(eq(items.trailId, trailId));

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
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const trailId = Number.parseInt(id, 10);

    if (Number.isNaN(trailId)) {
      return NextResponse.json({ error: "ID de trilha inválido" }, { status: 400 });
    }

    const trailWithProgress = await getTrailWithProgress(trailId);

    if (!trailWithProgress) {
      return NextResponse.json({ error: "Trilha não encontrada" }, { status: 404 });
    }

    return NextResponse.json(trailWithProgress);
  } catch (error) {
    console.error("Error fetching trail:", error);
    return NextResponse.json(
      { error: "Falha ao buscar trilha" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const trailId = Number.parseInt(id, 10);

    if (Number.isNaN(trailId)) {
      return NextResponse.json({ error: "ID de trilha inválido" }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = updateTrailSchema.parse(body);

    const [updatedTrail] = await db
      .update(trails)
      .set({
        name: validatedData.name,
        description: validatedData.description ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(trails.id, trailId))
      .returning();

    if (!updatedTrail) {
      return NextResponse.json({ error: "Trilha não encontrada" }, { status: 404 });
    }

    const trailWithProgress = await getTrailWithProgress(trailId);

    if (!trailWithProgress) {
      return NextResponse.json({ error: "Trilha não encontrada" }, { status: 404 });
    }

    return NextResponse.json(trailWithProgress);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados de entrada inválidos", details: error },
        { status: 400 },
      );
    }
    console.error("Error updating trail:", error);
    return NextResponse.json(
      { error: "Falha ao atualizar trilha" },
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
    const trailId = Number.parseInt(id, 10);

    if (Number.isNaN(trailId)) {
      return NextResponse.json({ error: "ID de trilha inválido" }, { status: 400 });
    }

    const [deletedTrail] = await db
      .delete(trails)
      .where(eq(trails.id, trailId))
      .returning();

    if (!deletedTrail) {
      return NextResponse.json({ error: "Trilha não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Trilha excluída com sucesso" });
  } catch (error) {
    console.error("Error deleting trail:", error);
    return NextResponse.json(
      { error: "Falha ao excluir trilha" },
      { status: 500 },
    );
  }
}
