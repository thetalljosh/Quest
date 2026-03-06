import { auth } from "@/features/auth/lib/auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/features/auth/components/SignOutButton";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen">
      <nav className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/quests" className="text-lg font-bold text-gray-900">
              ⚔️ QuestLog
            </Link>
            <NavLink href="/quests">Quests</NavLink>
            <NavLink href="/character">Character</NavLink>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {session.user.name ?? session.user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-gray-600 transition-colors hover:text-gray-900"
    >
      {children}
    </Link>
  );
}
