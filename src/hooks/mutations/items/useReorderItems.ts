"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const trailKeys = {
  items: (id: number) => ["trails", "detail", id, "items"],
  all: ["trails"],
};

const statsKeys = {
  all: ["stats"],
};

export function useReorderItems() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      trailId,
      itemOrders,
    }: {
      trailId: number;
      itemOrders: Array<{ id: number; order: number }>;
    }) => {
      const res = await fetch(`/api/trails/${trailId}/items/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemOrders }),
      });
      if (!res.ok) throw new Error("Falha ao reordenar itens");
      return res.json();
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: trailKeys.items(variables.trailId),
        }),
        queryClient.invalidateQueries({ queryKey: trailKeys.all }),
        queryClient.invalidateQueries({ queryKey: statsKeys.all }),
      ]);
    },
  });
}

