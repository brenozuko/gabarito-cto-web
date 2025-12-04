import { asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { items } from "~/server/db/schema";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const trailId = Number.parseInt(id, 10);

    if (Number.isNaN(trailId)) {
      return NextResponse.json({ error: "Invalid trail ID" }, { status: 400 });
    }

    const trailItems = await db
      .select()
      .from(items)
      .where(eq(items.trailId, trailId))
      .orderBy(asc(items.order), asc(items.id));

    return NextResponse.json(trailItems);
  } catch (error) {
    console.error("Error fetching trail items:", error);
    return NextResponse.json(
      { error: "Failed to fetch trail items" },
      { status: 500 },
    );
  }
}
