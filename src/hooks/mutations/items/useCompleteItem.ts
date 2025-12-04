"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const trailKeys = {
  items: (id: number) => ["trails", "detail", id, "items"],
};

const statsKeys = {
  all: ["stats"],
};

export function useCompleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/items/${id}/complete`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to update item completion");
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

