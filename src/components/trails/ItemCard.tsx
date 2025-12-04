"use client";

import { Checkbox } from "~/components/ui/checkbox";
import { useCompleteItem } from "~/hooks";
import { cn } from "~/lib/utils";

interface ItemCardProps {
  id: number;
  name: string;
  description: string | null;
  xp: number;
  completed: boolean;
  trailId: number;
}

export function ItemCard({
  id,
  name,
  description,
  xp,
  completed,
  trailId,
}: ItemCardProps) {
  const completeItem = useCompleteItem();

  const handleToggle = (checked: boolean) => {
    // Only mutate if the state is actually changing
    if (checked !== completed) {
      completeItem.mutate(id);
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all",
        completed
          ? "border-success bg-success/10"
          : "border-border bg-card hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={completed}
          onCheckedChange={handleToggle}
          disabled={completeItem.isPending}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <h4
              className={cn(
                "font-semibold",
                completed
                  ? "text-success-foreground line-through"
                  : "text-foreground"
              )}
            >
              {name}
            </h4>
            <span
              className={cn(
                "rounded-full px-2 py-1 text-xs font-bold",
                completed
                  ? "bg-success text-success-foreground"
                  : "bg-accent text-accent-foreground"
              )}
            >
              +{xp} XP
            </span>
          </div>
          {description && (
            <p
              className={cn(
                "text-sm",
                completed
                  ? "text-success-foreground/80"
                  : "text-muted-foreground"
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

