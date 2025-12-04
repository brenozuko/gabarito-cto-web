"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface StatsPanelProps {
  totalTrails: number;
  completedTrails: number;
  totalItems: number;
  completedItems: number;
  className?: string;
}

export function StatsPanel({
  totalTrails,
  completedTrails,
  totalItems,
  completedItems,
  className,
}: StatsPanelProps) {
  const trailsProgress =
    totalTrails > 0 ? (completedTrails / totalTrails) * 100 : 0;
  const itemsProgress =
    totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Estatísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-muted-foreground">Trilhas Concluídas</span>
              <span className="font-semibold">
                {completedTrails} / {totalTrails}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-success transition-all duration-300"
                style={{ width: `${trailsProgress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-muted-foreground">Itens Concluídos</span>
              <span className="font-semibold">
                {completedItems} / {totalItems}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${itemsProgress}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

