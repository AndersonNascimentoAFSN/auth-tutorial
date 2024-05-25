"use server"

import { RegisterSchema } from '@/schemas'
import { RegisterFormSchemaType } from '@/types/formTypes'

export const register = async (values: RegisterFormSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    // error: validatedFields.error
    return { error: "Invalid fields!" }
  }

  return { success: "Email sent!" }
  // revalidatePath('/auth/login')
}