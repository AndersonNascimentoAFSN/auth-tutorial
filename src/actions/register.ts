"use server"

import bcrypt from 'bcryptjs'

import { RegisterSchema } from '@/schemas'
import { RegisterFormSchemaType } from '@/types/formTypes'
import { createUser, getUserByEmail } from '@/data/user'

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

  // Todo: Send verification token email

  return { success: "User created!" }
  // revalidatePath('/auth/login')
}