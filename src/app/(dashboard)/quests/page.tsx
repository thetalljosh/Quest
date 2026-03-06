import { auth } from "@/features/auth/lib/auth";
import { getQuestsByUser } from "@/features/quests/lib/queries";
import { KanbanWrapper } from "@/features/kanban/components/KanbanWrapper";
import { QuestForm } from "@/features/quests/components/QuestForm";
import { moveQuestAction } from "./actions";

export default async function QuestsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const quests = await getQuestsByUser(session.user.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quest Board</h1>
      </div>

      <KanbanWrapper
        initialQuests={quests}
        moveAction={moveQuestAction}
      />

      <div className="mx-auto w-full max-w-md">
        <h2 className="mb-4 text-lg font-semibold">New Quest</h2>
        <QuestForm />
      </div>
    </div>
  );
}
