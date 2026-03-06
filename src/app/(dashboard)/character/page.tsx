import { auth } from "@/features/auth/lib/auth";
import { getProfile, getRecentQuestLogs } from "@/features/character/lib/queries";
import { CharacterSheet } from "@/features/character/components/CharacterSheet";
import { formatDate } from "@/shared/lib/utils";

export default async function CharacterPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const profile = await getProfile(session.user.id);
  if (!profile) return <p>No character found. Complete a quest to begin!</p>;

  const logs = await getRecentQuestLogs(session.user.id);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Character Sheet</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <CharacterSheet profile={profile} />

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Adventure Log</h2>
          {logs.length === 0 ? (
            <p className="text-sm text-gray-500">No adventures yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="flex items-center justify-between rounded-lg
                             bg-gray-50 px-3 py-2 text-sm"
                >
                  <span className="capitalize text-gray-700">{log.action}</span>
                  <span className="text-xs text-gray-400">
                    {formatDate(log.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
