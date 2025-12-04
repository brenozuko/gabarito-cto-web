"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const trailKeys = {
  items: (id: number) => ["trails", "detail", id, "items"],
  all: ["trails"],
};

const statsKeys = {
  all: ["stats"],
};

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Falha ao excluir item");
      const deletedItem = await res.json();
      return deletedItem;
    },
    onSuccess: async (result) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: trailKeys.items(result.trailId) }),
        queryClient.invalidateQueries({ queryKey: trailKeys.all }),
        queryClient.invalidateQueries({ queryKey: statsKeys.all }),
      ]);
    },
  });
}

