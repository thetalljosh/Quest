"use client";

import { useDroppable } from "@dnd-kit/core";
import { DraggableQuestCard } from "./DraggableQuestCard";
import type { Quest } from "@/features/quests/types";
import type { QuestStatus } from "@/shared/lib/constants";

interface KanbanColumnProps {
  status: QuestStatus;
  title: string;
  quests: Quest[];
}

export function KanbanColumn({ status, title, quests }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[200px] flex-col rounded-xl border p-3
                  transition-colors ${
                    isOver
                      ? "border-amber-400 bg-amber-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
    >
      <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
        {title}
        <span className="ml-2 text-gray-400">({quests.length})</span>
      </h2>

      <div className="flex flex-col gap-2">
        {quests.map((quest) => (
          <DraggableQuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  );
}
