import {z} from "zod";

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const registerFormSchema = z.object({
	email: z.string().email(),
	name: z.string().min(2).max(16),
	password: z.string(),
	confirmPassword: z.string(),
});

export type LoginFormSchema = typeof loginFormSchema;
export type RegisterFormSchema = typeof registerFormSchema;