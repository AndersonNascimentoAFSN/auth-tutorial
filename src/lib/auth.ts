import { auth } from "@/auth"
import { type ExtendedUser } from "@/next-auth";
import { UserRole } from "@prisma/client";

export async function currentUser(): Promise<ExtendedUser | undefined> {
  const session = await auth()

  return session?.user
}

export async function currentRole(): Promise<UserRole | undefined> {
  const session = await auth()

  return session?.user?.role
}