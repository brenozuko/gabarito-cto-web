"use client";

import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { useUpdateItem } from "~/hooks";

interface InlineItemFormProps {
  id: number;
  initialName: string;
  initialXp: number;
  onUpdate?: () => void;
}

export function InlineItemForm({
  id,
  initialName,
  initialXp,
  onUpdate,
}: InlineItemFormProps) {
  const [name, setName] = useState(initialName);
  const [xp, setXp] = useState(initialXp.toString());
  const updateItem = useUpdateItem();

  // Sincroniza quando as props mudarem
  useEffect(() => {
    setName(initialName);
    setXp(initialXp.toString());
  }, [initialName, initialXp]);

  const handleSave = () => {
    const xpNum = Number.parseInt(xp, 10);
    if (
      name.trim() !== initialName ||
      xpNum !== initialXp
    ) {
      if (name.trim().length === 0) {
        setName(initialName); // Reverte se vazio
        return;
      }
      if (isNaN(xpNum) || xpNum < 1) {
        setXp(initialXp.toString()); // Reverte se inválido
        return;
      }

      updateItem.mutate(
        {
          id,
          data: {
            name: name.trim(),
            xp: xpNum,
          },
        },
        {
          onSuccess: () => {
            onUpdate?.();
          },
        }
      );
    }
  };

  const handleNameBlur = () => {
    handleSave();
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setName(initialName);
    }
  };


  const handleXpBlur = () => {
    const xpNum = Number.parseInt(xp, 10);
    if (isNaN(xpNum) || xpNum < 1) {
      setXp(initialXp.toString());
    } else {
      handleSave();
    }
  };

  const handleXpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setXp(initialXp.toString());
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleNameBlur}
          onKeyDown={handleNameKeyDown}
          className="text-base font-semibold h-auto py-2 flex-1"
          maxLength={256}
          placeholder="Nome do item"
          disabled={updateItem.isPending}
        />
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground whitespace-nowrap">XP:</label>
          <Input
            type="number"
            value={xp}
            onChange={(e) => setXp(e.target.value)}
            onBlur={handleXpBlur}
            onKeyDown={handleXpKeyDown}
            className="w-20 h-8"
            min={1}
            disabled={updateItem.isPending}
          />
        </div>
      </div>
    </div>
  );
}

