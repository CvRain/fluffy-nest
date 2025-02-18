import { type Actions, fail } from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema, type LoginFormSchema, type LoginResponse } from '../schema';
import { API_BASE_URL } from '$lib/config';
import axios from 'axios';

export const load: PageServerLoad = async () => {
	console.log('Login page loaded');
	return {
		form: await superValidate(zod(loginFormSchema))
	};
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		console.log('form', form);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const result = await handleLogin(form.data);
			return { form, success: true, ...result };
		} catch (error) {
			return fail(400, { 
				form, 
				success: false, 
				message: error.response?.data?.message || 'Login failed' 
			});
		}
	},
} satisfies Actions;

const handleLogin = async (formData: LoginFormSchema) => {
	const requestUrl = `${API_BASE_URL}/user/login`;
	const response: LoginResponse = (await axios.post(requestUrl, formData)).data;
	if (response.code === 200) {
		return {
			token: response.token,
			message: 'Login successful'
		};
	}
	throw new Error(response.message || 'Login failed');
};