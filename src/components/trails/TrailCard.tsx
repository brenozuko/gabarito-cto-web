"use client";

import Link from "next/link";
import { ProgressBar } from "~/components/ProgressBar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

interface TrailCardProps {
  id: number;
  name: string;
  description: string | null;
  progress: number; // 0-100
  completedItems: number;
  totalItems: number;
}

export function TrailCard({
  id,
  name,
  description,
  progress,
  completedItems,
  totalItems,
}: TrailCardProps) {
  return (
    <Link href={`/trails/${id}`} className="block">
      <Card className="transition-all hover:scale-105 hover:shadow-md">
        <CardHeader>
          <CardTitle className="mb-2 text-xl">{name}</CardTitle>
          {description && (
            <CardDescription className="line-clamp-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completedItems} / {totalItems} itens concluídos
            </span>
            <span className="font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <ProgressBar progress={progress} />
        </CardContent>
      </Card>
    </Link>
  );
}

