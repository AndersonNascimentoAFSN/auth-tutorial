"use server"


import bcrypt from "bcryptjs"
import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { type SettingsFormSchemaType } from '@/types/formTypes'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { unstable_update } from '@/auth'

export async function settings(values: SettingsFormSchemaType) {
  const user = await currentUser()

  if (!user || !user.id) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  if (user.isOAuth) {
    Reflect.set(values, 'email', undefined)
    Reflect.set(values, 'password', undefined)
    Reflect.set(values, 'newPassword', undefined)
    Reflect.set(values, 'isTwoFactorEnabled', undefined)
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" }
    }

    const verificationToken = await generateVerificationToken(values.email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "Verification email sent!" }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password)

    if (!passwordsMatch) {
      return { error: "Incorrect password" }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)

    Reflect.set(values, 'password', hashedPassword)
    Reflect.set(values, 'newPassword', undefined)
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values
    }
  })

  await unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    }
  })

  return { success: "Settings Updated!" }
}