"use client";

import { useQuery } from "@tanstack/react-query";

const trailKeys = {
  items: (id: number) => ["trails", "detail", id, "items"],
};

export function useTrailItems(id: number) {
  return useQuery({
    queryKey: trailKeys.items(id),
    queryFn: async () => {
      const res = await fetch(`/api/trails/${id}/items`);
      if (!res.ok) throw new Error("Falha ao buscar itens da trilha");
      return res.json();
    },
    enabled: !!id,
  });
}

