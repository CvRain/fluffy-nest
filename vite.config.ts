import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps:{
		include: ['@exodus/schemasafe'] // make client-side validation work
	}
});
