"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { useCreateItem, useUpdateItem } from "~/hooks";

interface ItemFormProps {
  trailId: number;
  initialData?: {
    id: number;
    name: string;
    description: string | null;
    xp: number;
    order: number;
  };
  mode: "create" | "edit";
  onSuccess?: () => void;
}

export function ItemForm({
  trailId,
  initialData,
  mode,
  onSuccess,
}: ItemFormProps) {
  const router = useRouter();
  const createItem = useCreateItem();
  const updateItem = useUpdateItem();
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [xp, setXp] = useState(initialData?.xp ?? 10);
  const [order, setOrder] = useState(initialData?.order ?? 0);

  const isSubmitting = createItem.isPending || updateItem.isPending;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      if (mode === "create") {
        await createItem.mutateAsync({
          trailId,
          name,
          description: description || undefined,
          xp,
          order,
        });
      } else if (initialData) {
        await updateItem.mutateAsync({
          id: initialData.id,
          data: {
            name,
            description: description || undefined,
            xp,
            order,
          },
        });
      }
      onSuccess?.();
      if (!onSuccess) {
        router.back();
      }
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Failed to save item. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={256}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="xp"
            className="block text-sm font-medium text-gray-700"
          >
            XP *
          </label>
          <input
            type="number"
            id="xp"
            value={xp}
            onChange={(e) => setXp(Number.parseInt(e.target.value, 10) || 0)}
            required
            min={1}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            htmlFor="order"
            className="block text-sm font-medium text-gray-700"
          >
            Order
          </label>
          <input
            type="number"
            id="order"
            value={order}
            onChange={(e) =>
              setOrder(Number.parseInt(e.target.value, 10) || 0)
            }
            min={0}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : mode === "create" ? "Create" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (onSuccess) {
              onSuccess();
            } else {
              router.back();
            }
          }}
          disabled={isSubmitting}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

