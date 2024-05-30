import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from '@/lib/db'
import authConfig from '@/auth.config'
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export const {
  auth,
  handlers,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    newUser: '/auth/register'
    // signOut: '/auth/login',
    // verifyRequest: '/auth/verify-request',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true

      if (user.id) {
        const existingUser = await getUserById(user.id)

        // Prevent sign in without email verification
        if (!existingUser || !existingUser.emailVerified) {
          return false
        }

        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

          if (!twoFactorConfirmation) return false

          // Delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id }
          })
        }
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        Reflect.set(session.user, 'id', token.sub)
      }
      if (token.role && session.user) {
        Reflect.set(session.user, 'role', token.role)
      }
      if (token.isTwoFactorEnabled && session.user) {
        Reflect.set(session.user, 'isTwoFactorEnabled', token.isTwoFactorEnabled)
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      Reflect.set(token, 'role', existingUser.role)
      Reflect.set(token, 'isTwoFactorEnabled', existingUser.isTwoFactorEnabled)

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})