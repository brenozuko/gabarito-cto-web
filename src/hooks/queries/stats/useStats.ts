"use client";

import { useQuery } from "@tanstack/react-query";

const statsKeys = {
  all: ["stats"],
};

export function useStats() {
  const query = useQuery({
    queryKey: statsKeys.all,
    queryFn: async () => {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Falha ao buscar estatísticas");
      return res.json();
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

