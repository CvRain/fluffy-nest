import { API_BASE_URL } from '$lib/config';
import axios from 'axios';

export const getStoredToken = (): string => {
	const token = localStorage.getItem('token') || sessionStorage.getItem('token');

	return token?.trim() || '';
};

export const getStoredUserId = (): string => {
	const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');

	return userId?.trim() || '';
};

export const fetchUserData = async (token: string, userId: string) => {
	console.debug('fetchUserData token: ', token);
	console.debug('fetchUserData userId: ', userId);

	try {
		const requestData = JSON.stringify({
			user_id: userId
		});

		const config = {
			method: 'get',
			url: `${API_BASE_URL}/object/list`,
			headers: {
				Authorization: token,
				'Content-Type': 'application/json'
			},
			data: requestData
		};

		console.debug('fetchUserData config: ', config);

		const requestResult = await axios.request(config).then((response) => {
			return response.data;
		});
		console.debug('fetchUserData requestResult: ', requestResult);
	} catch (e) {
		console.error(e);
	}
};

export const fetchUserInfo = async (token: string, userId: string) => {
	try {
		const requestData = JSON.stringify({
			user_id: userId
		});

		const config = {
			method: 'post',
			url: `${API_BASE_URL}/user/one/id`,
			headers: {
				Authorization: token,
				'Content-Type': 'application/json'
			},
			data: requestData
		};

		console.debug('fetchUserInfo config: ', config);

		const requestResult = await axios.request(config).then((response) => {
			return response.data;
		});
		console.debug('fetchUserInfo requestResult: ', requestResult);
	} catch (e) {
		console.error(e);
	}
};
