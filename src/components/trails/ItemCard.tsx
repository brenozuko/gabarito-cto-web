"use client";

import { useCompleteItem } from "~/hooks";

interface ItemCardProps {
  id: number;
  name: string;
  description: string | null;
  xp: number;
  completed: boolean;
  trailId: number;
}

export function ItemCard({
  id,
  name,
  description,
  xp,
  completed,
  trailId,
}: ItemCardProps) {
  const completeItem = useCompleteItem();

  const handleToggle = () => {
    completeItem.mutate(id);
  };

  return (
    <div
      className={`rounded-lg border p-4 transition-all ${
        completed
          ? "border-green-500 bg-green-50"
          : "border-gray-200 bg-white hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
          disabled={completeItem.isPending}
          className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 disabled:opacity-50"
        />
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <h4
              className={`font-semibold ${
                completed ? "text-green-900 line-through" : "text-gray-900"
              }`}
            >
              {name}
            </h4>
            <span
              className={`rounded-full px-2 py-1 text-xs font-bold ${
                completed
                  ? "bg-green-200 text-green-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              +{xp} XP
            </span>
          </div>
          {description && (
            <p
              className={`text-sm ${
                completed ? "text-green-700" : "text-gray-600"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

