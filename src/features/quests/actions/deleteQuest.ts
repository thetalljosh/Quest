"use server";

import { db } from "@/shared/db/client";
import { quests } from "@/shared/db/schema";
import { auth } from "@/features/auth/lib/auth";
import { questDeleteSchema } from "@/features/quests/types/schemas";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteQuest(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { questId } = questDeleteSchema.parse({
    questId: formData.get("questId"),
  });

  await db
    .delete(quests)
    .where(and(eq(quests.id, questId), eq(quests.userId, session.user.id)));

  revalidatePath("/quests");
}
