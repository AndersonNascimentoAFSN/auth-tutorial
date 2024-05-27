"use server"

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { LoginFormSchemaType } from '@/types/formTypes'
import { AuthError } from 'next-auth'

export const login = async (values: LoginFormSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    // error: validatedFields.error
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { success: 'success authentication!' }
  } catch (error) {
    // TODO
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials!" }
        }
        default: {
          return { error: "Something went wrong!" }
        }
      }
    }
    throw error
  }
}