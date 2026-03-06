"use client";

import { KanbanBoard } from "@/features/kanban/components/KanbanBoard";
import type { Quest } from "@/features/quests/types";
import type { QuestStatus } from "@/shared/lib/constants";
import { useOptimistic, useTransition } from "react";

interface KanbanWrapperProps {
  initialQuests: Quest[];
  moveAction: (questId: string, newStatus: QuestStatus) => Promise<void>;
}

type OptimisticUpdate = { questId: string; newStatus: QuestStatus };

export function KanbanWrapper({
  initialQuests,
  moveAction,
}: KanbanWrapperProps) {
  const [isPending, startTransition] = useTransition();

  const [quests, addOptimistic] = useOptimistic<Quest[], OptimisticUpdate>(
    initialQuests,
    (state, { questId, newStatus }) =>
      state.map((q) =>
        q.id === questId ? { ...q, status: newStatus } : q
      )
  );

  function handleMoveQuest(questId: string, newStatus: QuestStatus) {
    addOptimistic({ questId, newStatus });
    startTransition(async () => {
      await moveAction(questId, newStatus);
    });
  }

  return (
    <div className={isPending ? "opacity-80" : ""}>
      <KanbanBoard quests={quests} onMoveQuest={handleMoveQuest} />
    </div>
  );
}
