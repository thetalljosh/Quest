"use server";

import { db } from "@/shared/db/client";
import { quests, questLogs, profiles } from "@/shared/db/schema";
import { auth } from "@/features/auth/lib/auth";
import { questUpdateStatusSchema } from "@/features/quests/types/schemas";
import { checkLevelUp, distributeStatPoints } from "@/features/character/lib/xpEngine";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { QuestType } from "@/shared/lib/constants";

export async function updateQuestStatus(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const parsed = questUpdateStatusSchema.parse({
    questId: formData.get("questId"),
    status: formData.get("status"),
    sortOrder: formData.get("sortOrder")
      ? Number(formData.get("sortOrder"))
      : undefined,
  });

  const [quest] = await db
    .select()
    .from(quests)
    .where(eq(quests.id, parsed.questId))
    .limit(1);

  if (!quest || quest.userId !== session.user.id) {
    throw new Error("Quest not found");
  }

  await db
    .update(quests)
    .set({
      status: parsed.status,
      sortOrder: parsed.sortOrder ?? quest.sortOrder,
      completedAt: parsed.status === "completed" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(quests.id, parsed.questId));

  if (parsed.status === "completed") {
    await awardXp(session.user.id, quest);
  }

  await logStatusChange(quest.id, session.user.id, parsed.status);
  revalidatePath("/quests");
}

async function awardXp(
  userId: string,
  quest: { id: string; xpReward: number; questType: string }
) {
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);

  if (!profile) return;

  const newTotal = profile.totalXp + quest.xpReward;
  const newCurrent = profile.currentXp + quest.xpReward;
  const { newLevel, didLevelUp } = checkLevelUp(profile.level, newTotal);
  const stats = distributeStatPoints(quest.questType as QuestType);

  await db
    .update(profiles)
    .set({
      totalXp: newTotal,
      currentXp: newCurrent,
      level: newLevel,
      statStamina: profile.statStamina + stats.stamina,
      statIntellect: profile.statIntellect + stats.intellect,
      statWillpower: profile.statWillpower + stats.willpower,
    })
    .where(eq(profiles.id, userId));
}

async function logStatusChange(
  questId: string,
  userId: string,
  status: string
) {
  const action =
    status === "completed"
      ? "completed"
      : status === "failed"
        ? "failed"
        : "moved";

  await db.insert(questLogs).values({
    questId,
    userId,
    action,
  });
}
