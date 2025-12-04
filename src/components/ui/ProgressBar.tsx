interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-in-out"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}

