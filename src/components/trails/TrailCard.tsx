"use client";

import Link from "next/link";
import { ProgressBar } from "~/components/ui/ProgressBar";

interface TrailCardProps {
  id: number;
  name: string;
  description: string | null;
  progress: number; // 0-100
  completedItems: number;
  totalItems: number;
}

export function TrailCard({
  id,
  name,
  description,
  progress,
  completedItems,
  totalItems,
}: TrailCardProps) {
  return (
    <Link
      href={`/trails/${id}`}
      className="block transform rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md"
    >
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{name}</h3>
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}
      </div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {completedItems} / {totalItems} items completed
        </span>
        <span className="font-semibold text-gray-900">
          {Math.round(progress)}%
        </span>
      </div>
      <ProgressBar progress={progress} />
    </Link>
  );
}

