"use client";

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ItemCardDraft } from "~/components/trails/ItemCardDraft";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useCreateTrail } from "~/hooks";
import { cn } from "~/lib/utils";

interface DraftItem {
  id: string;
  name: string;
  xp: number;
  order: number;
}

export default function NewTrailPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditingName, setIsEditingName] = useState(true);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [draftItems, setDraftItems] = useState<DraftItem[]>([]);
  const createTrail = useCreateTrail();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = draftItems.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = draftItems.findIndex(
        (item) => item.id === over.id
      );

      const reorderedItems = arrayMove(draftItems, oldIndex, newIndex);
      const itemsWithNewOrder = reorderedItems.map((item, index) => ({
        ...item,
        order: index,
      }));

      setDraftItems(itemsWithNewOrder);
    }
  };

  const handleAddItem = () => {
    const maxOrder = draftItems.length > 0
      ? Math.max(...draftItems.map((item) => item.order))
      : -1;

    const newItem: DraftItem = {
      id: `draft-${Date.now()}-${Math.random()}`,
      name: "Novo Item",
      xp: 10,
      order: maxOrder + 1,
    };

    setDraftItems([...draftItems, newItem]);
  };

  const handleUpdateItem = (id: string, updates: { name?: string; xp?: number }) => {
    setDraftItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setDraftItems((items) => {
      const filtered = items.filter((item) => item.id !== id);
      // Reordenar os itens restantes
      return filtered.map((item, index) => ({
        ...item,
        order: index,
      }));
    });
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Por favor, adicione um nome para a trilha.");
      return;
    }

    try {
      // Criar a trilha com os itens em uma única requisição
      const result = await createTrail.mutateAsync({
        name: name.trim(),
        description: description.trim() || undefined,
        items: draftItems.length > 0
          ? draftItems.map((item) => ({
              name: item.name.trim() || "Novo Item",
              xp: item.xp,
              order: item.order,
            }))
          : undefined,
      });

      // Redirecionar para a página da trilha
      router.push(`/trails/${result.trail.id}`);
    } catch (error) {
      console.error("Error saving trail:", error);
      alert("Falha ao salvar trilha. Por favor, tente novamente.");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Nova Trilha</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={createTrail.isPending || !name.trim()}
            >
              {createTrail.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                {isEditingName ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      } else if (e.key === "Escape") {
                        setName("");
                        setIsEditingName(false);
                      }
                    }}
                    className="text-3xl font-semibold h-auto py-2"
                    maxLength={256}
                    autoFocus
                    placeholder="Nome da trilha"
                    disabled={createTrail.isPending}
                  />
                ) : (
                  <h1
                    className="text-3xl font-semibold cursor-text hover:bg-accent/50 rounded px-2 py-2 -mx-2 transition-colors"
                    onClick={() => setIsEditingName(true)}
                  >
                    {name || "Clique para adicionar um nome"}
                  </h1>
                )}
              </div>

              <div>
                {isEditingDescription ? (
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setIsEditingDescription(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setDescription("");
                        setIsEditingDescription(false);
                      }
                    }}
                    className="min-h-[100px] resize-none"
                    maxLength={1000}
                    placeholder="Descrição (opcional)"
                    disabled={createTrail.isPending}
                  />
                ) : (
                  <p
                    className={cn(
                      "text-base text-muted-foreground cursor-text hover:bg-accent/50 rounded px-2 py-2 -mx-2 transition-colors",
                      !description && "text-muted-foreground/50 italic"
                    )}
                    onClick={() => setIsEditingDescription(true)}
                  >
                    {description || "Clique para adicionar uma descrição"}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Itens</h2>
        </div>

        {draftItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Button
                onClick={handleAddItem}
                size="lg"
                className="mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Novo Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={draftItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {draftItems.map((item) => (
                    <ItemCardDraft
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      xp={item.xp}
                      order={item.order}
                      onUpdate={handleUpdateItem}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <div className="mt-4 text-center">
              <Button
                onClick={handleAddItem}
                size="lg"
                className="mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Novo Item
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
