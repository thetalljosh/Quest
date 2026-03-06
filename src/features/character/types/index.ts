export type { QuestType, QuestStatus, QuestPriority, StatName } from "@/shared/lib/constants";

export interface Profile {
  id: string;
  displayName: string;
  level: number;
  currentXp: number;
  totalXp: number;
  statStamina: number;
  statIntellect: number;
  statWillpower: number;
  createdAt: Date;
}
