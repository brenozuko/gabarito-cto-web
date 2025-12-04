import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate level based on total XP
 * Formula: level = floor(total_XP / 100) + 1
 * Example: 0-99 XP = Level 1, 100-199 XP = Level 2
 */
export function calculateLevel(totalXp: number): number {
  return Math.floor(totalXp / 100) + 1;
}

/**
 * Calculate XP needed for next level
 */
export function xpForNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  const nextLevelXp = currentLevel * 100;
  return nextLevelXp - currentXp;
}

/**
 * Calculate progress percentage to next level
 */
export function progressToNextLevel(currentXp: number): number {
  const xpInLevel = currentXp % 100;
  return Math.min(100, (xpInLevel / 100) * 100);
}

/**
 * Format XP number with comma separator
 */
export function formatXP(xp: number): string {
  return xp.toLocaleString();
}
