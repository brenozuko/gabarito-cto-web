"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateItemInput } from "~/server/api/schemas";

const trailKeys = {
  items: (id: number) => ["trails", "detail", id, "items"],
};

const statsKeys = {
  all: ["stats"],
};

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateItemInput;
    }) => {
      const res = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update item");
      return res.json();
    },
    onSuccess: async (item) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: trailKeys.items(item.trailId),
        }),
        queryClient.invalidateQueries({ queryKey: statsKeys.all }),
      ]);
    },
  });
}

