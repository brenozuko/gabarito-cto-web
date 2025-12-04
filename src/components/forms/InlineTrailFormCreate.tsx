"use client";

import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useCreateTrail, useUpdateTrail } from "~/hooks";
import { cn } from "~/lib/utils";

interface InlineTrailFormCreateProps {
  onTrailCreated?: (trailId: number) => void;
  trailId?: number;
  initialName?: string;
  initialDescription?: string | null;
}

export function InlineTrailFormCreate({
  onTrailCreated,
  trailId,
  initialName,
  initialDescription,
}: InlineTrailFormCreateProps) {
  const [name, setName] = useState(initialName ?? "");
  const [description, setDescription] = useState(initialDescription ?? "");
  const [isEditingName, setIsEditingName] = useState(!trailId);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [createdTrailId, setCreatedTrailId] = useState<number | null>(trailId ?? null);
  const createTrail = useCreateTrail();
  const updateTrail = useUpdateTrail();

  const currentTrailId = createdTrailId ?? trailId;

  // Sincroniza quando as props mudarem
  useEffect(() => {
    if (initialName) setName(initialName);
    if (initialDescription !== undefined) setDescription(initialDescription ?? "");
  }, [initialName, initialDescription]);

  const handleNameBlur = async () => {
    setIsEditingName(false);
    if (name.trim().length === 0) return;

    if (!currentTrailId) {
      // Criar nova trilha
      try {
        const newTrail = await createTrail.mutateAsync({
          name: name.trim(),
          description: description.trim() || undefined,
        });
        setCreatedTrailId(newTrail.id);
        onTrailCreated?.(newTrail.id);
      } catch (error) {
        console.error("Error creating trail:", error);
        alert("Falha ao criar trilha. Por favor, tente novamente.");
      }
    } else {
      // Atualizar trilha existente
      if (name.trim() !== (initialName ?? "")) {
        updateTrail.mutate({
          id: currentTrailId,
          data: { name: name.trim() },
        });
      }
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setName("");
      setIsEditingName(false);
    }
  };

  const handleDescriptionBlur = async () => {
    setIsEditingDescription(false);
    if (!currentTrailId) return;

    const newDescription = description.trim();
    if (newDescription !== (initialDescription ?? "")) {
      updateTrail.mutate({
        id: currentTrailId,
        data: { description: newDescription || undefined },
      });
    }
  };

  const handleDescriptionKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Escape") {
      setDescription("");
      setIsEditingDescription(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        {isEditingName ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className="text-3xl font-semibold h-auto py-2"
            maxLength={256}
            autoFocus={!currentTrailId}
            placeholder="Nome da trilha"
            disabled={createTrail.isPending || updateTrail.isPending}
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
            onBlur={handleDescriptionBlur}
            onKeyDown={handleDescriptionKeyDown}
            className="min-h-[100px] resize-none"
            maxLength={1000}
            placeholder="Descrição (opcional)"
            disabled={createTrail.isPending || updateTrail.isPending}
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
  );
}

