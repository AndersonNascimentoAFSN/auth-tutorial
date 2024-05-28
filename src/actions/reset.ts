"use server"


import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import { ResetSchema } from "@/schemas"
import { ResetFormSchemaType } from "@/types/formTypes"


export async function reset(values: ResetFormSchemaType) {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      // error: validatedFields.error.errors[0].message
      error: 'Invalid email!'
    }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {
      error: 'Email not found'
    }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return {
    // success: 'Password reset instructions sent to your email'
    success: 'Reset email sent'
  }
}