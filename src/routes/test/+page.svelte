<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import MarkdownIt from 'markdown-it';
	import markdownItKatex from 'markdown-it-katex';
	import Shiki from '@shikijs/markdown-it';
	import { onMount } from 'svelte';
	import 'katex/dist/katex.min.css'; // Katex 数学公式样式
	import { Textarea } from '$lib/components/ui/textarea';
	import { full as emoji } from 'markdown-it-emoji';
	import 'github-markdown-css'

	let markdownText = `
# Hello Shiki!

## 数学公式示例
行内公式: $E=mc^2$

块级公式:
$$
\\int_0^\\infty x^2 dx
$$

## 代码示例
\`\`\`javascript
// Shiki 高亮测试
function hello() {
  console.log("Hello, Shiki!");
}
\`\`\`

\`\`\`python
# Python 示例
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
\`\`\`
`;

	let md = MarkdownIt({
		html: true,
		linkify: true,
		breaks: true, // 启用自动换行转换
		typographer: true, //启用更好的排版处理
		xhtmlOut: true
	});

	onMount(async () => {
		md.use(markdownItKatex) // 数学公式插件
			.use(emoji)
			.use(
				await Shiki({
					themes: {
						light: 'one-light',
						dark: 'one-dark-pro'
					}
				})
			);

		// 触发初始渲染
		htmlContent = md.render(markdownText);
	});

	// 响应式更新
	let htmlContent = '';
	$: {
		if (md) {
			htmlContent = md.render(markdownText);
		}
	}
</script>

<div class="container">
	<Card.Root>
		<Card.Content style="height: 100vh; width: 50vh;">
			<Textarea
				bind:value={markdownText}
				placeholder="输入 Markdown..."
				class="whitespace-pre-warp"
			/>
		</Card.Content>
	</Card.Root>
	<div class="preview">
		<Card.Root>
			<Card.Content class="markdown-body">
				{@html htmlContent}
			</Card.Content>
		</Card.Root>
	</div>
</div>


<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		padding: 20px;
		width: 90vh;
	}

	:global(.markdown-body){
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

	/* 嵌套列表 */
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

<!-- <style>
	/* 容器布局 */
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		padding: 20px;
		width: 90vh;
	}

	/* 在全局样式或预览容器内 */
	.preview :global(h1) {
		font-size: 2em;
		font-weight: 600;
		margin: 0.67em 0;
	}

	.preview :global(h2) {
		font-size: 1.5em;
		font-weight: 600;
		margin: 0.83em 0;
	}

	.preview :global(h3) {
		font-size: 1.17em;
		font-weight: 600;
		margin: 1em 0;
	}

	.preview :global(h4) {
		font-size: 1em;
		font-weight: 600;
		margin: 1.33em 0;
	}

	.preview :global(h5) {
		font-size: 0.83em;
		font-weight: 600;
		margin: 1.67em 0;
	}

	/* 保持暗黑模式兼容 */
	:global(.dark) .preview :global(h1),
	:global(.dark) .preview :global(h2),
	:global(.dark) .preview :global(h3),
	:global(.dark) .preview :global(h4),
	:global(.dark) .preview :global(h5) {
		color: white;
	}

	.preview :global(p) {
		margin: 0.5rem 0;
		line-height: 1.5;
	}

	.preview :global(br) {
		content: '';
		display: block;
		margin-bottom: 0.5em;
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

	/* 嵌套列表 */
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
</style> -->
