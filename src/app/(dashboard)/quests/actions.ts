"use server";

import { db } from "@/shared/db/client";
import { quests } from "@/shared/db/schema";
import { auth } from "@/features/auth/lib/auth";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { QuestStatus } from "@/shared/lib/constants";

export async function moveQuestAction(
  questId: string,
  newStatus: QuestStatus
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db
    .update(quests)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(
      and(eq(quests.id, questId), eq(quests.userId, session.user.id))
    );

  revalidatePath("/quests");
}
