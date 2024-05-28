"use server"

import bcrypt from 'bcryptjs'

import { RegisterSchema } from '@/schemas'
import { RegisterFormSchemaType } from '@/types/formTypes'
import { createUser, getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: RegisterFormSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    // error: validatedFields.error
    return { error: "Invalid fields!" }
  }

  const { email, name, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  const user = await createUser({ email, name, password: hashedPassword })

  if (!user) {
    return { error: "Error creating user!" }
  }

  const verificationToken = await generateVerificationToken(email)

  // Todo: Send verification token email
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: "Confirmation email sent!" }
}