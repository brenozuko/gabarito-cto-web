"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCreateTrail, useUpdateTrail } from "~/hooks";

interface TrailFormProps {
  initialData?: {
    id: number;
    name: string;
    description: string | null;
  };
  mode: "create" | "edit";
}

export function TrailForm({ initialData, mode }: TrailFormProps) {
  const router = useRouter();
  const createTrail = useCreateTrail();
  const updateTrail = useUpdateTrail();
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");

  const isSubmitting = createTrail.isPending || updateTrail.isPending;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      if (mode === "create") {
        await createTrail.mutateAsync({
          name,
          description: description || undefined,
        });
      } else if (initialData) {
        await updateTrail.mutateAsync({
          id: initialData.id,
          data: {
            name,
            description: description || undefined,
          },
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Error saving trail:", error);
      alert("Failed to save trail. Please try again.");
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
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

