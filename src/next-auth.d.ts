import { type DefaultSession } from "next-auth"
import { JWT } from '@auth/core/jwt'

import { Role } from '@/types/role'


export type ExtendedUser = DefaultSession["user"] & {
  role: Role
  isTwoFactorEnabled: boolean
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: Role
    isTwoFactorEnabled: boolean
  }
}