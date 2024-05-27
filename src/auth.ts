import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from '@/lib/db'
import authConfig from '@/auth.config'
import { getUserById } from "@/data/user"

export const {
  auth,
  handlers,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log('url', url)
    //   console.log('baseUrl', baseUrl)
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
    // async signIn({ user }) {
    //   if (user.id) {
    //     const existingUser = await getUserById(user.id)

    //     if(!existingUser || !existingUser.emailVerified) {
    //       return false
    //     }
    //   }

    //   return true
    // },
    async session({ token, session }) {
      if (token.sub && session.user) {
        Reflect.set(session.user, 'id', token.sub)
      }
      if (token.role && session.user) {
        Reflect.set(session.user, 'role', token.role)
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      
      Reflect.set(token, 'role', existingUser.role)

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})