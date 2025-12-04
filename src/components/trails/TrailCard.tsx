"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProgressBar } from "~/components/ProgressBar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useDeleteTrail } from "~/hooks";
import { cn } from "~/lib/utils";

interface TrailCardProps {
  id: number;
  name: string;
  description: string | null;
  progress: number; // 0-100
  completedItems: number;
  totalItems: number;
  maxXp: number;
}

export function TrailCard({
  id,
  name,
  description,
  progress,
  completedItems,
  totalItems,
  maxXp,
}: TrailCardProps) {
  const router = useRouter();
  const deleteTrail = useDeleteTrail();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Tem certeza que deseja excluir esta trilha?")) {
      deleteTrail.mutate(id, {
        onSuccess: () => {
          router.refresh();
        },
      });
    }
  };

  return (
    <div className="relative h-full">
      <Link href={`/trails/${id}`} className="block h-full">
        <Card className="flex h-full min-h-[200px] flex-col transition-all hover:scale-105 hover:shadow-md">
          <CardHeader className="shrink-0">
            <CardTitle className="mb-2 text-xl">{name}</CardTitle>
            {description && (
              <CardDescription className="line-clamp-2">
                {description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-end">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedItems} / {totalItems} itens concluídos
              </span>
              <span className="font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
            <ProgressBar progress={progress} />
            <div className="mt-2 text-sm text-muted-foreground">
              XP máximo: {maxXp}
            </div>
          </CardContent>
        </Card>
      </Link>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleDelete}
        disabled={deleteTrail.isPending}
        className={cn(
          "absolute right-2 top-2 text-destructive hover:text-destructive hover:bg-destructive/10",
          deleteTrail.isPending && "opacity-50"
        )}
        title="Excluir trilha"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

