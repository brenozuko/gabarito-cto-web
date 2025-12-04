"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const trailKeys = {
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
      return res.json();
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: trailKeys.all }),
        queryClient.invalidateQueries({ queryKey: statsKeys.all }),
      ]);
    },
  });
}

