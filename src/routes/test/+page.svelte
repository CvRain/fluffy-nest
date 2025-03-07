<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import MarkdownIt from 'markdown-it';
	import markdownItKatex from 'markdown-it-katex';
	import hljs from 'highlight.js'; // 代码高亮
	import 'katex/dist/katex.min.css'; // Katex 数学公式样式
	import 'highlight.js/styles/github.css'; // 代码高亮主题

	const md = new MarkdownIt({
		html: true, // 允许 HTML 标签
		linkify: true, // 自动转换 URL 为链接
		highlight: (code, lang) => {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(code, { language: lang }).value;
				} catch (_) {}
			}
			return ''; // 使用自动检测
		}
	}).use(markdownItKatex); // 添加数学公式支持

	let markdownText = `
# Hello Markdown-it!

## 数学公式示例
行内公式: $E=mc^2$

块级公式:
$$
\\int_0^\\infty x^2 dx
$$

## 代码示例
\`\`\`javascript
// 高亮测试
function hello() {
  console.log("Hello, Svelte!");
}
\`\`\`
`;

	// 实时转换
	$: htmlContent = md.render(markdownText);
</script>

<div class="container">
	<textarea bind:value={markdownText} placeholder="输入 Markdown..."></textarea>
	<div class="preview">
		{@html htmlContent}
	</div>
</div>

<style>
	/* 容器布局 */
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		padding: 20px;
	}

	/* 编辑区样式 */
	textarea {
		width: 100%;
		height: 600px;
		padding: 10px;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		font-family: 'Fira Code', monospace;
		resize: none;
	}

	/* 预览区样式 */
	.preview {
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		padding: 20px;
		overflow-y: auto;
	}

	/* Markdown 内容样式 */
	.preview :global(h1) {
		color: #2c3e50;
		border-bottom: 2px solid #eee;
	}
</style>
