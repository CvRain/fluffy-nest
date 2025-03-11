<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import MarkdownIt from 'markdown-it';
	import { onMount } from 'svelte';
	import 'katex/dist/katex.min.css';
	import { full as emoji } from 'markdown-it-emoji';
	import sanitizeHtml from 'sanitize-html';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/obsidian.css';
	import 'github-markdown-css/github-markdown.css';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	let {
		markdownText
	}: {
		markdownText: string;
	} = $props();

	let md: MarkdownIt | null = null as MarkdownIt | null;

	let initialized = $state(false);

	onMount(async () => {
		// 动态加载语言支持（按需加载）
		await import('highlight.js/lib/languages/javascript');
		await import('highlight.js/lib/languages/typescript');
		await import('highlight.js/lib/languages/css');

		await Promise.all([
			import('highlight.js/lib/languages/javascript'),
			import('highlight.js/lib/languages/typescript')
		]).then(([jsLang, tsLang]) => {
			hljs.registerLanguage('javascript', jsLang.default);
			hljs.registerLanguage('typescript', tsLang.default);
		});

		// 创建 Markdown 解析器实例
		md = new MarkdownIt({
			html: true,
			linkify: true,
			breaks: true,
			typographer: true,
			xhtmlOut: true,
			highlight: (str: string, lang: string) => {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return hljs.highlight(str, {
							language: lang,
							ignoreIllegals: true // 忽略无法解析的语法
						}).value;
					} catch (e) {
						console.warn('高亮错误:', e);
						return str;
					}
				}
				return hljs.highlightAuto(str).value; // 自动检测语言 帅！
			}
		}) as MarkdownIt;

		md.use(emoji);

		initialized = true;
	});

	const sanitizeOptions = {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span', 'pre', 'code', 'kbd', 'samp']),
		allowedAttributes: {
			'*': ['class', 'style'],
			code: ['class*'],
			span: ['class*']
		},
		allowedClasses: {
			code: [/^language-/, /hljs/],
			span: [/^hljs-/]
		}
	};

	const htmlContent = $derived(
		initialized && md
			? sanitizeHtml(md.render(markdownText), sanitizeOptions)
			: '<p>Loading code highlighter...</p>'
	);
</script>

<main class="container">
	<ScrollArea class="preview markdown-body rounded-md" scrollHideDelay={10}>
		{@html htmlContent}
	</ScrollArea>
</main>

<style>
	.container {
		height: 100vh;
		display: flex;
	}

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

	:global(.preview) {
		flex: 1;
		overflow: auto;
	}

	:global(.preview) :global(ul) {
		list-style: disc outside none;
		margin: 0.75rem 0;
		padding-left: 2rem;
	}

	:global(.preview) :global(ol) {
		list-style: decimal outside none;
		margin: 0.75rem 0;
		padding-left: 2rem;
	}

	:global(.preview) :global(li) {
		margin: 0.25rem 0;
		line-height: 1.6;
	}

	:global(.preview) :global(ul) :global(ul) {
		list-style-type: circle;
		margin: 0.2rem 0;
	}

	:global(.preview) :global(ul) :global(ul) :global(ul) {
		list-style-type: square;
	}

	:global(.preview) :global(ol) :global(ol) {
		list-style-type: lower-alpha;
	}

	:global(.preview) :global(ol) :global(ol) :global(ol) {
		list-style-type: lower-roman;
	}
</style>
