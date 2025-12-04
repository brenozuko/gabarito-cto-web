"use client";

import { useQuery } from "@tanstack/react-query";

const trailKeys = {
  list: ["trails", "list"],
};

export function useListTrails() {
  return useQuery({
    queryKey: trailKeys.list,
    queryFn: async () => {
      const res = await fetch("/api/trails");
      if (!res.ok) throw new Error("Falha ao buscar trilhas");
      return res.json();
    },
  });
}

