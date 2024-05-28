import { z } from "zod";
import {
  LoginSchema,
  RegisterSchema,
  ResetSchema,
  NewPasswordSchema,
} from "@/schemas";

export type LoginFormSchemaType = z.infer<typeof LoginSchema>
export type RegisterFormSchemaType = z.infer<typeof RegisterSchema>
export type ResetFormSchemaType = z.infer<typeof ResetSchema>
export type NewPasswordFormSchemaType = z.infer<typeof NewPasswordSchema>