import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { items } from "~/server/db/schema";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const itemId = Number.parseInt(id, 10);

    if (Number.isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
    }

    const [item] = await db
      .select()
      .from(items)
      .where(eq(items.id, itemId))
      .limit(1);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Toggle completion status
    const [updatedItem] = await db
      .update(items)
      .set({
        completed: !item.completed,
        updatedAt: new Date(),
      })
      .where(eq(items.id, itemId))
      .returning();

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating item completion:", error);
    return NextResponse.json(
      { error: "Failed to update item completion" },
      { status: 500 },
    );
  }
}
