"use server"

import { LoginSchema } from '@/schemas'
import { LoginFormSchemaType } from '@/types/formTypes'

export const login = async (values: LoginFormSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    // error: validatedFields.error
    return { error: "Invalid fields!" }
  }

  return { success: "Email sent!" }
  // revalidatePath('/auth/login')
}