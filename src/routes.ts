/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 *  @type {string[]}
 */

export const publicRoutes: string[] = [
  "/",
  "/auth/new-verification",
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings 
 *  @type {string[]}
 */

export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/forgot-password",
  "/auth/new-password",
]

/**
 * The prefix for the authentication API routes
 * Routes that start with this prefix are used for API authentication purposes
 *  @type {string}
 */

export const apiAuthPrefix: string = "/api/auth"

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/settings"

/**
 * The default redirect path if is not logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_PAGE_REDIRECT: string = "/auth/login"