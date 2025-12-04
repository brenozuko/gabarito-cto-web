"use client";

interface StatsPanelProps {
  totalTrails: number;
  completedTrails: number;
  totalItems: number;
  completedItems: number;
  className?: string;
}

export function StatsPanel({
  totalTrails,
  completedTrails,
  totalItems,
  completedItems,
  className = "",
}: StatsPanelProps) {
  const trailsProgress =
    totalTrails > 0 ? (completedTrails / totalTrails) * 100 : 0;
  const itemsProgress =
    totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
      <h2 className="mb-4 text-xl font-bold text-gray-900">Statistics</h2>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-gray-600">Trails Completed</span>
            <span className="font-semibold text-gray-900">
              {completedTrails} / {totalTrails}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${trailsProgress}%` }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-gray-600">Items Completed</span>
            <span className="font-semibold text-gray-900">
              {completedItems} / {totalItems}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${itemsProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

