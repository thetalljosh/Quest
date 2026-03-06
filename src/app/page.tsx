import { auth } from "@/features/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect("/quests");
  }

  redirect("/login");
}
