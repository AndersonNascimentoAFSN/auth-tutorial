import * as z from 'zod'

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