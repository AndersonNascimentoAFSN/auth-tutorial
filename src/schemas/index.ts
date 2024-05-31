import * as z from 'zod'
import { UserRole } from '@prisma/client'
import { newPassword } from '@/actions/new-password'

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Must be a string",
    })
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Must be a string",
    })
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
  name: z
    .string()
    .min(1, { message: 'Name is required' }),
})

export const ResetSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Must be a string",
    })
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export const SettingsSchema = z.object({
  name: z.optional(z.string().min(1, { message: 'Name is required' })),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email({ message: 'Invalid email address' })),
  password: z.optional(z.string().min(6, { message: 'Password must be at least 6 characters long' })),
  newPassword: z.optional(z.string().min(6, { message: 'Password must be at least 6 characters long' })),
}).refine((data) => {
  if (!data.password && data.newPassword) {
    return false
  }

  return true
}, {
  message: 'Password is required',
  path: ['password']
}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false
  }

  return true
}, {
  message: 'New password is required',
  path: ['newPassword']
})