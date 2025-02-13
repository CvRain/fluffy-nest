// import axios from 'axios';
// import {API_BASE_URL} from '$lib/config';
import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes/auth/login/$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema } from '../schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
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
// export const handleLogin = async () => {
// 	try {
// 		const requestUrl = `${API_BASE_URL}/api/user/login`;
// 		const response = await fetch(requestUrl, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({ email, password })
// 		});
//
// 		if (response.ok) {
// 			const data = await response.json();
// 			console.log('Login successful:', data);
// 			await goto('/craft_table'); // 登录成功后跳转到craft_table页面
// 		} else {
// 			console.error('Login failed:', response.statusText);
// 		}
// 	} catch (error) {
// 		console.error('Error during login:', error);
// 	}
// };