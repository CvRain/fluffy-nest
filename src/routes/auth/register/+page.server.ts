import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type RegisterFormSchema, registerFormSchema } from '../schema';
import { API_BASE_URL } from '$lib/config';
import axios from 'axios';

export const load: PageServerLoad = async () => {
	console.log('Login page loaded');
	return {
		form: await superValidate(zod(registerFormSchema))
	};
};

export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event, zod(registerFormSchema));
		console.log('form', form);
		if (!form.valid) {
			// 表单验证失败
			return fail(400, { form });
		}
		return registerHandle(form.data);
	}
} satisfies Actions;

const registerHandle = async (formData: RegisterFormSchema) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/user/append`, formData);
		console.log('Register response:', response.data);
		return response.data;
	} catch (error) {
		console.error('Register error:', error);
		throw error;
	}
};

//todo 检查后端是否支持注册
export const checkEnableRegister = async () =>{

}
