import { z } from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";

export type LoginFormSchemaType = z.infer<typeof LoginSchema>
export type RegisterFormSchemaType = z.infer<typeof RegisterSchema>