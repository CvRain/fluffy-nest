import { type Actions, fail } from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema } from '../schema';
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
		if (!form.valid) { // 表单验证失败
			return fail(400, { form });
		}
		return handleLogin(form.data)
	},
} satisfies Actions;

const handleLogin = async (formData: { email: string; password: string }) => {
	try {
		const requestUrl = `${API_BASE_URL}/user/login`;
		const response = await axios.post(requestUrl, formData);
		return response.data;
	} catch (error) {
		console.error('Error during login:', error);
		throw error;
	}
};

// export const handleTokenLogin = async () => {
// 	//从cookie中获取token
// 	const token = document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];
//
// 	const config = {
// 		method: 'get',
// 		url: `${API_BASE_URL}/user/login/token`,
// 		headers: {
// 			'Authorization': token
// 		}
// 	};
//
// 	axios(config)
// 		.then(function (response) {
// 			console.log(JSON.stringify(response.data));
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// }
//
