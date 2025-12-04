"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTrailInput } from "~/server/api/schemas";

const trailKeys = {
  list: ["trails", "list"],
  detail: (id: number) => ["trails", "detail", id],
};

const statsKeys = {
  all: ["stats"],
};

export function useUpdateTrail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateTrailInput;
    }) => {
      const res = await fetch(`/api/trails/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao atualizar trilha");
      return res.json();
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: trailKeys.list }),
        queryClient.invalidateQueries({
          queryKey: trailKeys.detail(variables.id),
        }),
        queryClient.invalidateQueries({ queryKey: statsKeys.all }),
      ]);
    },
  });
}

