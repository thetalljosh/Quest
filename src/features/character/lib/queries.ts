import { db } from "@/shared/db/client";
import { profiles, questLogs } from "@/shared/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Profile } from "@/features/character/types";

export async function getProfile(userId: string): Promise<Profile | null> {
  const [row] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);

  return (row as Profile) ?? null;
}

export async function getRecentQuestLogs(userId: string, limit = 10) {
  return db
    .select()
    .from(questLogs)
    .where(eq(questLogs.userId, userId))
    .orderBy(desc(questLogs.createdAt))
    .limit(limit);
}
