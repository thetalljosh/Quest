"use client";

import { createQuest } from "@/features/quests/actions/createQuest";
import {
  QUEST_TYPES,
  QUEST_PRIORITIES,
  QUEST_TYPE_LABELS,
  PRIORITY_LABELS,
} from "@/shared/lib/constants";
import { useRef } from "react";

export function QuestForm({ onClose }: { onClose?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await createQuest(formData);
    formRef.current?.reset();
    onClose?.();
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
      <input
        name="title"
        required
        placeholder="Quest title..."
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm
                   focus:border-amber-500 focus:outline-none focus:ring-1
                   focus:ring-amber-500"
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        rows={3}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm
                   focus:border-amber-500 focus:outline-none focus:ring-1
                   focus:ring-amber-500"
      />

      <div className="grid grid-cols-2 gap-3">
        <SelectField name="questType" label="Type" options={QUEST_TYPES} labels={QUEST_TYPE_LABELS} />
        <SelectField name="priority" label="Priority" options={QUEST_PRIORITIES} labels={PRIORITY_LABELS} />
      </div>

      <input
        name="dueDate"
        type="date"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />

      <button
        type="submit"
        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium
                   text-white transition-colors hover:bg-amber-600"
      >
        Accept Quest ⚔️
      </button>
    </form>
  );
}

function SelectField<T extends string>({
  name,
  label,
  options,
  labels,
}: {
  name: string;
  label: string;
  options: readonly T[];
  labels: Record<T, string>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <select
        name={name}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {labels[opt]}
          </option>
        ))}
      </select>
    </div>
  );
}
