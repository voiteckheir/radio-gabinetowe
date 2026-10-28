import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Tu mówimy SvelteKitowi, że przygotowujemy stronę na własny serwer VPS (Node.js)
		adapter: adapter()
	}
};

export default config;
