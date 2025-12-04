import { eq } from "drizzle-orm";
import { StatsPanel } from "~/components/stats/StatsPanel";
import { XPDisplay } from "~/components/stats/XPDisplay";
import { TrailCard } from "~/components/trails/TrailCard";
import { ButtonLink } from "~/components/ui/button-link";
import { db } from "~/server/db";
import { items, trails } from "~/server/db/schema";

async function getTrailsWithProgress() {
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

      return {
        ...trail,
        progress,
        completedItems: completedItems.length,
        totalItems: trailItems.length,
      };
    }),
  );

  return trailsWithProgress;
}

async function getStats() {
  const allItems = await db.select().from(items);
  const allTrails = await db.select().from(trails);

  const totalXp = allItems
    .filter((item) => item.completed)
    .reduce((acc, item) => acc + item.xp, 0);

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
        isComplete,
      };
    }),
  );

  const completedTrails = trailStats.filter((stat) => stat.isComplete).length;
  const completedItems = allItems.filter((item) => item.completed).length;

  return {
    totalXp,
    totalTrails: allTrails.length,
    completedTrails,
    totalItems: allItems.length,
    completedItems,
  };
}

export default async function HomePage() {
  const trailsData = await getTrailsWithProgress();
  const stats = await getStats();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-foreground">
            Trilhas de Aprendizado
          </h1>
          <ButtonLink href="/trails/new">Nova Trilha</ButtonLink>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <XPDisplay totalXp={stats.totalXp} />
          <StatsPanel
            totalTrails={stats.totalTrails}
            completedTrails={stats.completedTrails}
            totalItems={stats.totalItems}
            completedItems={stats.completedItems}
          />
        </div>

        {trailsData.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-lg text-muted-foreground">
              Ainda não há trilhas. Crie sua primeira trilha para começar!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trailsData.map((trail) => (
              <TrailCard
                key={trail.id}
                id={trail.id}
                name={trail.name}
                description={trail.description}
                progress={trail.progress}
                completedItems={trail.completedItems}
                totalItems={trail.totalItems}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
