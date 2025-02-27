import axios from 'axios';
import type { PageServerLoad } from './$types';

export interface ImageData {
	url: string,
	title: string,
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