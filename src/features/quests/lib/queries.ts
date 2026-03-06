import { db } from "@/shared/db/client";
import { quests } from "@/shared/db/schema";
import { eq, asc } from "drizzle-orm";
import type { Quest } from "@/features/quests/types";

export async function getQuestsByUser(userId: string): Promise<Quest[]> {
  const rows = await db
    .select()
    .from(quests)
    .where(eq(quests.userId, userId))
    .orderBy(asc(quests.sortOrder));

  return rows as Quest[];
}
