import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
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
		//console.log('form', form);
		if (!form.valid) {
			return fail(400, { form });
		}
		const result = await handleLogin(form.data);
		return result;
	},
} satisfies Actions;

const handleLogin = async (formData: LoginFormSchema) => {
	try {
		const requestUrl = `${API_BASE_URL}/user/login`;
		const response: LoginResponse = (await axios.post(requestUrl, formData)).data;
		//console.log('Login response:', response);

		if (response.code !== 200) {
			return fail(400, {
				form: {
					data: formData,
					errors: { server: response.message },
				},
				...response
			});
		}

		return { form: { data: formData }, ...response };
	} catch (error) {
		console.error('Login error:', error);
		return fail(500, {
			form: {
				data: formData,
				errors: { server: '服务器错误，请稍后重试' }
			}
		});
	}
};