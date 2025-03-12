<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';

		let {data}: {
			data: PageData
		} = $props()

		onMount(() => {
			console.log("User name:", data.userName);
		});
</script>

<div>
	<h1>Hello {data.userName}</h1>
</div>