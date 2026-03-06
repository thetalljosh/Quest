interface XpProgressBarProps {
  currentXp: number;
  nextLevelXp: number;
}

export function XpProgressBar({ currentXp, nextLevelXp }: XpProgressBarProps) {
  const percentage = nextLevelXp > 0
    ? Math.min((currentXp / nextLevelXp) * 100, 100)
    : 0;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-gray-600">Experience</span>
        <span className="text-gray-500">
          {currentXp} / {nextLevelXp} XP
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400
                     to-amber-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
