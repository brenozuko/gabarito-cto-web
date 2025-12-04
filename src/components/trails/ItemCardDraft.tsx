"use client";

import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface DraftItem {
  id: string;
  name: string;
  xp: number;
  order: number;
}

interface ItemCardDraftProps {
  id: string;
  name: string;
  xp: number;
  order: number;
  onUpdate: (id: string, updates: { name?: string; xp?: number }) => void;
  onDelete: (id: string) => void;
}

export function ItemCardDraft({
  id,
  name,
  xp,
  order,
  onUpdate,
  onDelete,
}: ItemCardDraftProps) {
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(id, { name: e.target.value });
  };

  const handleXpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const xpValue = Number.parseInt(e.target.value, 10);
    if (!isNaN(xpValue) && xpValue > 0) {
      onUpdate(id, { xp: xpValue });
    }
  };

  const handleDelete = () => {
    onDelete(id);
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
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Input
                  value={name}
                  onChange={handleNameChange}
                  className="text-base font-semibold h-auto py-2 flex-1"
                  maxLength={256}
                  placeholder="Nome do item"
                />
                <div className="flex items-center gap-2">
                  <label className="text-sm text-muted-foreground whitespace-nowrap">XP:</label>
                  <Input
                    type="number"
                    value={xp}
                    onChange={handleXpChange}
                    className="w-20 h-8"
                    min={1}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleDelete}
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

