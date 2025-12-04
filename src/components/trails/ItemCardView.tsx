"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { useCompleteItem } from "~/hooks";
import { cn } from "~/lib/utils";

interface ItemCardViewProps {
  id: number;
  name: string;
  xp: number;
  completed: boolean;
}

export function ItemCardView({
  id,
  name,
  xp,
  completed: initialCompleted,
}: ItemCardViewProps) {
  const [localCompleted, setLocalCompleted] = useState(initialCompleted);
  const completeItem = useCompleteItem();

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
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

