import { auth } from "@/auth"
import { type ExtendedUser } from "@/next-auth";

export async function currentUser(): Promise<(ExtendedUser) | undefined> {
  const session = await auth()

  return session?.user
}