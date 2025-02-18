<script lang="ts">
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
	const { imageData, error } = data;
</script>


<main>
	{#if imageData}
		<div class="glass-container">
			<img src="https://cn.bing.com/{imageData.url}" alt={imageData.title} />
			<p>{imageData.copyright}</p>
		</div>
	{:else if error}
		<p>Error: {error}</p>
	{:else}
		<p>Loading...</p>
	{/if}
</main>


<style>
    .glass-container {
        position: relative;
        display: inline-block;
        background: rgba(255, 255, 255, 0.1); /* 半透明背景 */
        backdrop-filter: blur(10px); /* 毛玻璃效果 */
        padding: 10px;
        border-radius: 8px;
    }
    .glass-container img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 8px;
        filter: blur(5px); /* 高斯模糊效果 */
    }
    .glass-container p {
        margin-top: 10px;
    }
</style>