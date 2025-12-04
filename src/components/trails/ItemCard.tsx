"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { useCompleteItem, useDeleteItem } from "~/hooks";
import { cn } from "~/lib/utils";

interface ItemCardProps {
  id: number;
  name: string;
  description: string | null;
  xp: number;
  completed: boolean;
  trailId: number;
  order?: number;
}

export function ItemCard({
  id,
  name,
  description,
  xp,
  completed: initialCompleted,
  trailId,
  order,
}: ItemCardProps) {
  const [localCompleted, setLocalCompleted] = useState(initialCompleted);
  const completeItem = useCompleteItem();
  const deleteItem = useDeleteItem();

  // Sincroniza o estado local quando a prop mudar (após invalidação da query)
  useEffect(() => {
    setLocalCompleted(initialCompleted);
  }, [initialCompleted]);

  const handleToggle = (checked: boolean) => {
    // Atualiza o estado local imediatamente para resposta instantânea
    setLocalCompleted(checked);
    // Só faz a mutação se o estado realmente mudou
    if (checked !== initialCompleted) {
      completeItem.mutate(id, {
        onError: () => {
          // Reverte o estado local em caso de erro
          setLocalCompleted(initialCompleted);
        },
      });
    }
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      deleteItem.mutate(id);
    }
  };

  return (
    <Card
      className={cn(
        "transition-all",
        localCompleted
          ? "border-success bg-success/10"
          : "hover:shadow-md"
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={localCompleted}
            onCheckedChange={handleToggle}
            disabled={completeItem.isPending}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <CardTitle
                className={cn(
                  "text-base",
                  localCompleted && "text-success line-through"
                )}
              >
                {name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-bold",
                    localCompleted
                      ? "bg-success text-white"
                      : "bg-accent text-accent-foreground"
                  )}
                >
                  +{xp} XP
                </span>
                <div className="flex gap-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    disabled={completeItem.isPending || deleteItem.isPending}
                    title="Editar item"
                  >
                    <Link href={`/trails/${trailId}/items/${id}/edit`}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleDelete}
                    disabled={completeItem.isPending || deleteItem.isPending}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    title="Excluir item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
            {description && (
              <CardDescription
                className={cn(
                  "mt-1",
                  localCompleted && "text-success/80"
                )}
              >
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
