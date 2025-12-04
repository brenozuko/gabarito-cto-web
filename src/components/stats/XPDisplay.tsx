"use client";

import { ProgressBar } from "~/components/ui/ProgressBar";
import { calculateLevel, formatXP } from "~/lib/utils";

interface XPDisplayProps {
  totalXp: number;
  className?: string;
}

export function XPDisplay({ totalXp, className = "" }: XPDisplayProps) {
  const level = calculateLevel(totalXp);
  const xpInCurrentLevel = totalXp % 100;
  const xpForNextLevel = 100 - xpInCurrentLevel;
  const progressToNextLevel = (xpInCurrentLevel / 100) * 100;

  return (
    <div className={`rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white ${className}`}>
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <p className="text-sm opacity-90">Level</p>
          <p className="text-4xl font-bold">{level}</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90">Total XP</p>
          <p className="text-2xl font-bold">{formatXP(totalXp)}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs opacity-90">
          <span>{xpInCurrentLevel} / 100 XP</span>
          <span>{xpForNextLevel} XP to next level</span>
        </div>
        <ProgressBar progress={progressToNextLevel} />
      </div>
    </div>
  );
}

