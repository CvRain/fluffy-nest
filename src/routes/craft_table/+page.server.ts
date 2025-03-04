import { API_BASE_URL } from '$lib/config';
import type { BaseResponse } from '$lib/schema';
import axios from 'axios';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { TreeDirectoryResponse } from './schema';

export const load: PageServerLoad = async ({cookies}) => {
	const token = cookies.get('token');
	const userId = cookies.get('user_id');

	 // 检查 token 是否存在
	if (!token || !userId) {
        console.log('未登录，重定向到登录页面');
        throw redirect(303, '/auth/login');
    }

    // 检查 userId 是否存在
    if (!userId || userId === 'undefined' || userId === 'null' || userId === '') {
		console.log('userId is not exist');
        throw redirect(303, '/auth/login');
    }

    // 检查 token 是否过期
    const tokenCheckResult = await checkTokenExpired(userId, token);
    if (tokenCheckResult.code !== 200) {
		console.log('token is expired');
        throw redirect(303, '/auth/login');
    }

    // 获取用户信息
    const userInfo = await getPersonalInfo(userId, token);

	await getPersonalDirectory(userId, token);
    
    return {
        code: userInfo.code,
        message: userInfo.message,
        status: userInfo.status,
        result: userInfo.result
    };
};

const checkTokenExpired = async (userId: string, token: string) => {
	const url = new URL(`${API_BASE_URL}/user/login/token`);
	url.searchParams.append('user_id', userId);

	const config = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	};

	try {
		const response: BaseResponse = await axios(url.toString(), config).then((result) => {
			return result.data;
		});
		console.log('checkTokenExpired: ', response);
		return response;
	} catch (error) {
		console.error('checkTokenExpired: ', error);
		return {
			code: '401',
			message: 'checkTokenExpired error',
			status: 'error',
			result: error
		};
	}
};

const getPersonalInfo = async (userId: string, token: string) => {
	const url = new URL(`${API_BASE_URL}/user/one/id`);
	url.searchParams.append('user_id', userId);

	try {
		const response: BaseResponse = await axios(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			}
		}).then((result) => {
			return result.data;
		});
		console.log('getPersonalInfo: ', response);
		return response;
	} catch(error) {
		console.error('getPersonalInfo: ', error);
		return {
			code: '401',
			message: 'getPersonalInfo error',
			status: 'error',
			result: error
		};
	}
};


const getPersonalDirectory = async(userId: string, token: string) => {
	const url = new URL(`${API_BASE_URL}/object/tree`);
	url.searchParams.append('user_id', userId);

	try{
		const response = await axios(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			}
		}).then((result) => {
			return result.data;
		});

		
		const result: TreeDirectoryResponse = response.data;

		console.log('getPersonalDirectory: ', result);
	}catch(error){
		console.error('getPersonalInfo: ', error);
		return {
			code: '401',
			message: 'getPersonalInfo error',
			status: 'error',
			result: error
		};
	}
}