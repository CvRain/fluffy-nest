<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import MarkdownIt from 'markdown-it';
	import Shiki from '@shikijs/markdown-it';
	import { onMount } from 'svelte';
	import 'katex/dist/katex.min.css';
	import { full as emoji } from 'markdown-it-emoji';
	import sanitizeHtml from 'sanitize-html';
	import 'github-markdown-css'
	import { bundledLanguages } from 'shiki';

	let {markdownText}: {
		markdownText: string;
	} = $props();

	// 状态定义
	let md = MarkdownIt({
			html: true,
			linkify: true,
			breaks: true,
			typographer: true,
			xhtmlOut: true
		});

	let isLoading = $state(true);

	// 使用 $derived 自动追踪依赖
	const htmlContent = $derived(md && !isLoading ? sanitizeHtml(md.render(markdownText)) : '');

	// 异步初始化
	onMount(async () => {
		try {
			md.use(emoji)
			.use(await Shiki({
				themes: {
					light: 'catppuccin-latte',
					dark: 'catppuccin-mocha'
				},
			}));
		} catch (error) {
			console.error('Shiki 初始化失败:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<Card.Root>
	<Card.Content class="markdown-body">
		{#if isLoading}
			<div class="loading">Rendering...</div>
		{:else}
			<div class="preview">
				{@html htmlContent}
			</div>
		{/if}
	</Card.Content>
	//test
	<div>
		{markdownText}
	</div>
</Card.Root>

<style>
	:global(.markdown-body) {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		:global(.markdown-body) {
			padding: 15px;
		}
	}

	.preview :global(ul) {
		list-style: disc outside none;
		margin: 0.75rem 0;
		padding-left: 2rem;
	}

	.preview :global(ol) {
		list-style: decimal outside none;
		margin: 0.75rem 0;
		padding-left: 2rem;
	}

	.preview :global(li) {
		margin: 0.25rem 0;
		line-height: 1.6;
	}

	.preview :global(ul) :global(ul) {
		list-style-type: circle;
		margin: 0.2rem 0;
	}

	.preview :global(ul) :global(ul) :global(ul) {
		list-style-type: square;
	}

	.preview :global(ol) :global(ol) {
		list-style-type: lower-alpha;
	}

	.preview :global(ol) :global(ol) :global(ol) {
		list-style-type: lower-roman;
	}
</style>
