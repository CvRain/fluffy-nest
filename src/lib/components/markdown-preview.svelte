<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import MarkdownIt from 'markdown-it';
	import { onMount } from 'svelte';
	import 'katex/dist/katex.min.css';
	import { full as emoji } from 'markdown-it-emoji';
	import sanitizeHtml from 'sanitize-html';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import 'github-markdown-css/github-markdown.css';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import markdownItAnchor from 'markdown-it-anchor';
	import markdownItTocDoneRight from 'markdown-it-toc-done-right';
	import markdownItLinkAttributes from 'markdown-it-link-attributes';

	let {
		markdownText
	}: {
		markdownText: string;
	} = $props();

	let md: MarkdownIt | null = null as MarkdownIt | null;

	let initialized = $state(false);


	onMount(async () => {
		try {
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

			md = new MarkdownIt({
				html: true,
				linkify: true,
				breaks: true,
				typographer: true,
				xhtmlOut: true,
				highlight: (str, lang) => {
					if (lang && hljs.getLanguage(lang)) {
						try {
							return `<pre class="hljs-rounded"><code>${
								hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
							}</code></pre>`;
						} catch (e) {
							console.warn('Highlight error:', e);
						}
					}
					return `<pre class="hljs-rounded"><code>${hljs.highlightAuto(str).value}</code></pre>`;
				}
			});

			// 添加扩展插件
			md.use(emoji)
				.use(markdownItAnchor, {
					permalink: markdownItAnchor.permalink.linkInsideHeader({
						symbol: `
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
								<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
							</svg>
						`,
						placement: 'before'
					})
				})
				.use(markdownItTocDoneRight, {
					listType: 'ul',
					containerClass: 'toc-container'
				})
				.use(markdownItLinkAttributes, {
					pattern: /^https?:\/\//,
					attrs: {
						target: '_blank',
						rel: 'noopener noreferrer'
					}
				});

			initialized = true;
		} catch (e) {
			console.error('Markdown processor initialization failed:', e);
		}
	});

	const sanitizeOptions = {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat([
			'span', 'pre', 'code', 'kbd', 'samp', 'div', 'section'
		]),
		allowedAttributes: {
			'*': ['class', 'style', 'id', 'aria-hidden'],
			a: ['href', 'name', 'target', 'rel'],
			code: ['class*'],
			span: ['class*', 'data-*']
		},
		allowedClasses: {
			code: [/^language-/, /hljs/],
			span: [/^hljs-/],
			div: [/^code-/]
		}
	};

	const htmlContent = $derived(
		initialized && md
			? sanitizeHtml(md.render(markdownText), sanitizeOptions)
			: '<p>Loading code highlighter...</p>'
	);
</script>

<Card.Root class="markdown-previewer">
	<Card.Content class="content-wrapper">
		<ScrollArea
			class="preview markdown-body"
			scrollHideDelay={100}
			type="auto"
		>
			<div class="prose-container">
				{@html htmlContent}
			</div>
		</ScrollArea>
	</Card.Content>
</Card.Root>

<!--<style lang="postcss">-->
<!--    .markdown-previewer {-->
<!--        @apply h-full border transition-colors duration-300;-->
<!--        border-color: var(&#45;&#45;border-color);-->

<!--        .content-wrapper {-->
<!--            @apply p-4 h-[calc(100vh-120px)] overflow-hidden;-->
<!--        }-->

<!--        .preview {-->
<!--            @apply h-full pr-4;-->

<!--            .hljs-rounded {-->
<!--                @apply rounded-lg border p-4;-->
<!--                border-color: var(&#45;&#45;border-color);-->
<!--                background: var(&#45;&#45;code-bg);-->
<!--            }-->
<!--        }-->
<!--    }-->

<!--    :global(.markdown-body) {-->
<!--        @apply bg-background text-foreground p-6;-->
<!--        font-family: var(&#45;&#45;font-body);-->
<!--        line-height: 1.75;-->

<!--        h1, h2, h3, h4 {-->
<!--            @apply text-foreground font-semibold border-b pb-2 mb-4;-->
<!--            border-color: var(&#45;&#45;border-color);-->
<!--        }-->

<!--        code:not([class]) {-->
<!--            @apply bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-sm;-->
<!--        }-->

<!--        pre {-->
<!--            @apply bg-muted/50 p-4 rounded-lg shadow-sm transition-colors;-->
<!--        }-->

<!--        .toc-container {-->
<!--            @apply bg-muted/50 p-4 rounded-lg mb-4;-->

<!--            ul {-->
<!--                @apply list-disc pl-4 space-y-2;-->
<!--            }-->

<!--            a {-->
<!--                @apply text-primary hover:underline;-->
<!--            }-->
<!--        }-->

<!--        .task-list-item {-->
<!--            @apply list-none pl-0;-->

<!--            input[type="checkbox"] {-->
<!--                @apply mr-2 align-middle;-->
<!--            }-->
<!--        }-->
<!--    }-->

<!--    .prose-container {-->
<!--        @apply max-w-none prose prose-sm dark:prose-invert;-->
<!--        prose-headings: font-semibold;-->

<!--        &.dark {-->
<!--            &#45;&#45;code-bg: theme(colors.muted.DEFAULT);-->
<!--            &#45;&#45;tw-prose-body: theme(colors.foreground);-->
<!--            &#45;&#45;tw-prose-headings: theme(colors.primary.DEFAULT);-->
<!--            &#45;&#45;tw-prose-code: theme(colors.secondary.foreground);-->
<!--        }-->
<!--    }-->

<!--    @media (max-width: 768px) {-->
<!--        :global(.markdown-body) {-->
<!--            @apply p-4;-->

<!--            pre {-->
<!--                @apply -mx-4 px-4;-->
<!--                width: calc(100% + 2rem);-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</style>-->