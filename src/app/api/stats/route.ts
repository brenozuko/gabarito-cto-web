import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { items, trails } from "~/server/db/schema";

export async function GET() {
  try {
    // Get all items with their XP values
    const allItems = await db.select().from(items);

    // Calculate total XP from completed items
    const totalXp = allItems
      .filter((item) => item.completed)
      .reduce((acc, item) => acc + item.xp, 0);

    // Get all trails with their items
    const allTrails = await db.select().from(trails);

    // Calculate completed trails (trails where all items are completed)
    const trailStats = await Promise.all(
      allTrails.map(async (trail) => {
        const trailItems = await db
          .select()
          .from(items)
          .where(eq(items.trailId, trail.id));

        const completedItems = trailItems.filter((item) => item.completed);
        const isComplete =
          trailItems.length > 0 && completedItems.length === trailItems.length;

        return {
          trailId: trail.id,
          trailName: trail.name,
          totalItems: trailItems.length,
          completedItems: completedItems.length,
          isComplete,
          progress:
            trailItems.length > 0
              ? (completedItems.length / trailItems.length) * 100
              : 0,
        };
      }),
    );

    const completedTrails = trailStats.filter((stat) => stat.isComplete).length;

    // Calculate level
    const level = Math.floor(totalXp / 100) + 1;
    const xpInCurrentLevel = totalXp % 100;
    const xpForNextLevel = 100 - xpInCurrentLevel;
    const progressToNextLevel = (xpInCurrentLevel / 100) * 100;

    return NextResponse.json({
      totalXp,
      level,
      xpInCurrentLevel,
      xpForNextLevel,
      progressToNextLevel,
      totalTrails: allTrails.length,
      completedTrails,
      totalItems: allItems.length,
      completedItems: allItems.filter((item) => item.completed).length,
      trailStats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 },
    );
  }
}
