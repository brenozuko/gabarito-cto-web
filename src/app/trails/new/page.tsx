"use client";

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { InlineTrailFormCreate } from "~/components/forms/InlineTrailFormCreate";
import { ItemCardEdit } from "~/components/trails/ItemCardEdit";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useCreateItem, useReorderItems, useTrail, useTrailItems } from "~/hooks";

interface TrailItem {
  id: number;
  name: string;
  description: string | null;
  xp: number;
  order: number;
  completed: boolean;
}

export default function NewTrailPage() {
  const [trailId, setTrailId] = useState<number | null>(null);
  const { data: trail } = useTrail(trailId ?? 0);
  const { data: trailItems = [] } = useTrailItems(trailId ?? 0);
  const createItem = useCreateItem();
  const reorderItems = useReorderItems();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleTrailCreated = (id: number) => {
    setTrailId(id);
  };

  const handleDragEnd = (event: any) => {
    if (!trailId) return;

    const { active, over } = event;

    if (over && active.id !== over.id) {
      const typedItems = trailItems as TrailItem[];
      const oldIndex = typedItems.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = typedItems.findIndex(
        (item) => item.id === over.id
      );

      const reorderedItems = arrayMove(typedItems, oldIndex, newIndex) as TrailItem[];

      // Atualiza a ordem no backend
      const itemOrders = reorderedItems.map(
        (item, index) => ({
          id: item.id,
          order: index,
        })
      );

      reorderItems.mutate({
        trailId,
        itemOrders,
      });
    }
  };

  const handleAddItem = () => {
    if (!trailId) return;

    const maxOrder = trailItems.length > 0
      ? Math.max(...trailItems.map((item: { order: number }) => item.order))
      : -1;

    createItem.mutate({
      trailId,
      name: "Novo Item",
      xp: 10,
      order: maxOrder + 1,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-primary hover:text-primary/80 hover:underline"
          >
            ← Voltar para Trilhas
          </Link>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <InlineTrailFormCreate
              onTrailCreated={handleTrailCreated}
              trailId={trailId ?? undefined}
              initialName={trail?.name}
              initialDescription={trail?.description}
            />
          </CardContent>
        </Card>

        {trailId && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Itens</h2>
              <Button onClick={handleAddItem} disabled={createItem.isPending}>
                <Plus className="h-4 w-4 mr-2" />
                {createItem.isPending ? "Adicionando..." : "Adicionar Item"}
              </Button>
            </div>

            {trailItems.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-lg text-muted-foreground">
                    Ainda não há itens. Clique em "Adicionar Item" para começar!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={trailItems.map((item: { id: number }) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {trailItems.map(
                      (item: {
                        id: number;
                        name: string;
                        xp: number;
                        order: number;
                      }) => (
                        <ItemCardEdit
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          xp={item.xp}
                          order={item.order}
                        />
                      )
                    )}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </>
        )}
      </div>
    </main>
  );
}
