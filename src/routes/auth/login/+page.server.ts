import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema, type LoginFormSchema, type LoginResponse } from '../schema';
import { API_BASE_URL } from '$lib/config';
import axios from 'axios';
import {dev} from '$app/environment';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginFormSchema))
	};
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const result = await handleLogin(form.data);

		// 设置 cookies
        if (result.code === 200) {  // 修改判断条件
            event.cookies.set('token', result.data.token, {
                path: '/',
                httpOnly: true,
                secure: !dev,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            });
            event.cookies.set('user_id', result.data.id, {
                path: '/',
                httpOnly: true,
                secure: !dev,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            });
        }

		return result;
	},
} satisfies Actions;

const handleLogin = async (formData: LoginFormSchema) : Promise<LoginResponse> => {
	try {
		const requestUrl = `${API_BASE_URL}/user/login`;
		const response: LoginResponse = (await axios.post(requestUrl, formData)).data;

		if (response.code !== 200) {
			return {
                code: response.code,
                message: response.message,
                status: response.status,
                data: {
                    email: '',
                    id: '',
                    token: ''
                }
            };
		}

		return response;

	} catch (error) {
		console.error('Login error:', error);
		return {
            code: 500,
            message: '服务器错误，请稍后重试',
            status: 'error',
            data: {
                email: '',
                id: '',
                token: ''
            }
        };
	}
};