// import axios from 'axios';
// import {API_BASE_URL} from '$lib/config';
import { type Actions, fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const mockUsers = [
	{email: "admin@admin.com", password: "admin123"}
]

export const actions: Actions = {
	default: async ({ request }) => {
		console.debug("login request")

		const data = await request.formData()
		const { email, password } = Object.fromEntries(data.entries());

		console.debug("login request", email, password)

		if(!email || !password){
			return fail(400, {error: '请输入账号和密码'});
		}

		const user = mockUsers.find(u => u.email === email && u.password === password);
		if(!user){
			return fail(400, {error: '账号或密码错误'});
		}

		throw redirect(302, '/craft_table');
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