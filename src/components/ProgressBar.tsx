import { cn } from "~/lib/utils";

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-in-out"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}

