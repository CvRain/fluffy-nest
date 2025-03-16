import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		title: 'Hello world!',
		content: `${params.param}`
	};
};