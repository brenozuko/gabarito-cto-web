"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateItemInput } from "~/server/api/schemas";

const trailKeys = {
  items: (id: number) => ["trails", "detail", id, "items"],
};

const statsKeys = {
  all: ["stats"],
};

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateItemInput) => {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create item");
      return res.json();
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: trailKeys.items(variables.trailId),
        }),
        queryClient.invalidateQueries({ queryKey: statsKeys.all }),
      ]);
    },
  });
}

