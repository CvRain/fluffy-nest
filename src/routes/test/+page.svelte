<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { Textarea } from '$lib/components/ui/textarea';
	import MarkdownPreview from '$lib/components/markdown-preview.svelte';

	let markdownText = $state(' # Markdown Preview\n\nHello, **world**!');
</script>

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="github-markdown.css">

<div class="container">
	<Card.Root>
		<Card.Content class="editor-container">
			<Textarea
				bind:value={markdownText}
				placeholder="输入 Markdown..."
				class="whitespace-pre-wrap h-full"
			/>
		</Card.Content>
	</Card.Root>
	
	<Card.Root>
		<Card.Content class="preview-container">
			<MarkdownPreview {markdownText} />
		</Card.Content>
	</Card.Root>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		height: 100vh;
		padding: 1rem;
	}
</style>