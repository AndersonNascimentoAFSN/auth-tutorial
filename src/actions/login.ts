"use server"

import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { LoginFormSchemaType } from '@/types/formTypes'
import { generateVerificationToken } from '@/lib/tokens'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'

export const login = async (values: LoginFormSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    // error: validatedFields.error
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    await sendVerificationEmail(existingUser.email, verificationToken.token)
    
    return { success: "Confirmation email sent!" }
  }

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