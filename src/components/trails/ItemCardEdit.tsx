"use client";

import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
} from "~/components/ui/card";
import { InlineItemForm } from "~/components/forms/InlineItemForm";
import { useDeleteItem } from "~/hooks";
import { cn } from "~/lib/utils";

interface ItemCardEditProps {
  id: number;
  name: string;
  xp: number;
  order: number;
}

export function ItemCardEdit({
  id,
  name,
  xp,
  order,
}: ItemCardEditProps) {
  const deleteItem = useDeleteItem();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      deleteItem.mutate(id);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "transition-all",
        isDragging && "shadow-lg"
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <button
            {...attributes}
            {...listeners}
            className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
            type="button"
            aria-label="Arrastar para reordenar"
          >
            <GripVertical className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <InlineItemForm
              id={id}
              initialName={name}
              initialXp={xp}
            />
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleDelete}
            disabled={deleteItem.isPending}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-1"
            title="Excluir item"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

