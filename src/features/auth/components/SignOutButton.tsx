import { signOutAction } from "@/features/auth/actions";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="rounded-md px-3 py-1.5 text-sm text-gray-600
                   transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        Sign Out
      </button>
    </form>
  );
}
