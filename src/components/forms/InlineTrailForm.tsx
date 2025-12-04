"use client";

import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useUpdateTrail } from "~/hooks";
import { cn } from "~/lib/utils";

interface InlineTrailFormProps {
  id: number;
  initialName: string;
  initialDescription: string | null;
}

export function InlineTrailForm({
  id,
  initialName,
  initialDescription,
}: InlineTrailFormProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const updateTrail = useUpdateTrail();

  // Sincroniza quando as props mudarem
  useEffect(() => {
    setName(initialName);
    setDescription(initialDescription ?? "");
  }, [initialName, initialDescription]);

  const handleNameBlur = () => {
    setIsEditingName(false);
    if (name.trim() !== initialName && name.trim().length > 0) {
      updateTrail.mutate({
        id,
        data: { name: name.trim() },
      });
    } else if (name.trim().length === 0) {
      setName(initialName); // Reverte se vazio
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setName(initialName);
      setIsEditingName(false);
    }
  };

  const handleDescriptionBlur = () => {
    setIsEditingDescription(false);
    const newDescription = description.trim();
    if (newDescription !== (initialDescription ?? "")) {
      updateTrail.mutate({
        id,
        data: { description: newDescription || undefined },
      });
    }
  };

  const handleDescriptionKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Escape") {
      setDescription(initialDescription ?? "");
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
            autoFocus
            disabled={updateTrail.isPending}
          />
        ) : (
          <h1
            className="text-3xl font-semibold cursor-text hover:bg-accent/50 rounded px-2 py-2 -mx-2 transition-colors"
            onClick={() => setIsEditingName(true)}
          >
            {name || "Sem título"}
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
            autoFocus
            disabled={updateTrail.isPending}
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

