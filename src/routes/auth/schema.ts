import {z} from "zod";
import type {BaseResponse} from "$lib/schema";

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

export interface LoginResponse extends BaseResponse{
	email: string;
	id: string;
	token: string
}

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;