"use server"

import { signOut } from "@/auth";
import { DEFAULT_LOGIN_PAGE_REDIRECT } from "@/routes";

export async function logout() {
  await signOut({
    redirectTo: DEFAULT_LOGIN_PAGE_REDIRECT,
  })
}