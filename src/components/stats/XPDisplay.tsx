"use client";

import {
  Card,
  CardContent,
} from "~/components/ui/card";
import { ProgressBar } from "~/components/ProgressBar";
import { calculateLevel, formatXP } from "~/lib/utils";
import { cn } from "~/lib/utils";

interface XPDisplayProps {
  totalXp: number;
  className?: string;
}

export function XPDisplay({ totalXp, className }: XPDisplayProps) {
  const level = calculateLevel(totalXp);
  const xpInCurrentLevel = totalXp % 100;
  const xpForNextLevel = 100 - xpInCurrentLevel;
  const progressToNextLevel = (xpInCurrentLevel / 100) * 100;

  return (
    <Card
      className={cn(
        "bg-gradient-to-r from-primary to-accent text-primary-foreground",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="mb-2 flex items-baseline justify-between">
          <div>
            <p className="text-sm opacity-90">Nível</p>
            <p className="text-4xl font-bold">{level}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">XP Total</p>
            <p className="text-2xl font-bold">{formatXP(totalXp)}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs opacity-90">
            <span>{xpInCurrentLevel} / 100 XP</span>
            <span>{xpForNextLevel} XP para o próximo nível</span>
          </div>
          <ProgressBar progress={progressToNextLevel} />
        </div>
      </CardContent>
    </Card>
  );
}

