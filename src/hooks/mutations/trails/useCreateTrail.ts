"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTrailInput } from "~/server/api/schemas";

const trailKeys = {
  list: ["trails", "list"],
  detail: (id: number) => ["trails", "detail", id],
  items: (id: number) => ["trails", "detail", id, "items"],
};

const statsKeys = {
  all: ["stats"],
};

export function useCreateTrail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTrailInput) => {
      const res = await fetch("/api/trails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao criar trilha");
      return res.json() as Promise<{ trail: { id: number }; items: Array<{ id: number }> }>;
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: trailKeys.list }),
        queryClient.invalidateQueries({ queryKey: trailKeys.detail(data.trail.id) }),
        queryClient.invalidateQueries({ queryKey: trailKeys.items(data.trail.id) }),
        queryClient.invalidateQueries({ queryKey: statsKeys.all }),
      ]);
    },
  });
}

