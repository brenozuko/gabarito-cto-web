"use client";

import { useQuery } from "@tanstack/react-query";

const trailKeys = {
  detail: (id: number) => ["trails", "detail", id],
};

export function useTrail(id: number) {
  return useQuery({
    queryKey: trailKeys.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/trails/${id}`);
      if (!res.ok) throw new Error("Falha ao buscar trilha");
      return res.json();
    },
    enabled: !!id,
  });
}

