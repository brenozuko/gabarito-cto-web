"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const trailKeys = {
  list: ["trails", "list"],
};

const statsKeys = {
  all: ["stats"],
};

export function useDeleteTrail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/trails/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete trail");
      return res.json();
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: trailKeys.list }),
        queryClient.invalidateQueries({ queryKey: statsKeys.all }),
      ]);
    },
  });
}

