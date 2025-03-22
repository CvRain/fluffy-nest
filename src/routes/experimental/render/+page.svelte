<script lang="ts">
	import MarkdownPreview from "@/components/markdown-preview.svelte";
	import { onMount } from 'svelte';
	import axios from 'axios';

	let markdownText: string = $state('# loading')

	onMount(async () => {
		//get http://cvrain.obs.cn-east-3.myhuaweicloud.com/f89ad213-75be-4825-b4c9-022c64491aef/index.md
		const response = await axios.get('http://cvrain.obs.cn-east-3.myhuaweicloud.com/f89ad213-75be-4825-b4c9-022c64491aef/index.md');
		markdownText = response.data;
		console.log(markdownText);
	})

</script>

<main>
	<MarkdownPreview {markdownText}/>
</main>