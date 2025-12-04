"use client";

import { StatsPanel } from "~/components/stats/StatsPanel";
import { XPDisplay } from "~/components/stats/XPDisplay";
import { TrailCard } from "~/components/trails/TrailCard";
import { ButtonLink } from "~/components/ui/button-link";
import { useListTrails, useStats } from "~/hooks";

interface TrailWithProgress {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date | number;
  updatedAt: Date | number | null;
  progress: number;
  completedItems: number;
  totalItems: number;
  maxXp: number;
}

export default function HomePage() {
  const { data: trailsData = [], isLoading: trailsLoading } = useListTrails();
  const { data: stats, isLoading: statsLoading } = useStats();

  const isLoading = trailsLoading || statsLoading;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Carregando...</div>
        </div>
      </main>
    );
  }

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
          <XPDisplay totalXp={stats?.totalXp ?? 0} />
          <StatsPanel
            totalTrails={stats?.totalTrails ?? 0}
            completedTrails={stats?.completedTrails ?? 0}
            totalItems={stats?.totalItems ?? 0}
            completedItems={stats?.completedItems ?? 0}
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
            {trailsData.map((trail: TrailWithProgress) => (
              <TrailCard
                key={trail.id}
                id={trail.id}
                name={trail.name}
                description={trail.description}
                progress={trail.progress ?? 0}
                completedItems={trail.completedItems ?? 0}
                totalItems={trail.totalItems ?? 0}
                maxXp={trail.maxXp ?? 0}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
