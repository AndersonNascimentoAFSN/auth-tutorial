import NextAuth from "next-auth"

import authConfig from "@/auth.config"

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_PAGE_REDIRECT,
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRouter = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRouter) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_PAGE_REDIRECT, nextUrl))
  }

  return
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // matcher: ["/auth/login", "/auth/register"],

  // Exemplo de match disponível em: https://clerk.com/docs/references/nextjs/clerk-middleware#clerk-middleware
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}