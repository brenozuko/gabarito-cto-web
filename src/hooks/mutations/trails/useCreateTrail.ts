"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTrailInput } from "~/server/api/schemas";

const trailKeys = {
  list: ["trails", "list"],
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
      if (!res.ok) throw new Error("Failed to create trail");
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

