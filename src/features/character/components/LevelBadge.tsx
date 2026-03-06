interface LevelBadgeProps {
  level: number;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100
                     px-3 py-1 text-sm font-bold text-amber-800">
      ⚔️ Level {level}
    </span>
  );
}
