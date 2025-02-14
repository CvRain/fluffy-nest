import axios from 'axios';
import type { PageServerLoad } from './$types';

export interface ImageData {
	startDate: string,
	fullStartDate: string,
	endDate: string,
	url: string,
	urlBase: string,
	copyright: string,
	copyrightLink: string,
	title: string,
	quiz: string,
	wp: boolean,
	hsh: string,
	drk: number,
	top: number,
	bot: number,
	hs: []
}

const loadImage = async () => {
	const requestUrl = "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
	try {
		const response = await axios.get(requestUrl);
		const imageData: ImageData = response.data.images[0];
		return imageData;
	} catch (error) {
		console.error(error);
		return null; // 或者返回一个错误对象
	}
}

export const load: PageServerLoad = async () => {
	const imageData = await loadImage();
	if (imageData) {
		return { imageData };
	} else {
		return { error: 'Failed to load image data' };
	}
}