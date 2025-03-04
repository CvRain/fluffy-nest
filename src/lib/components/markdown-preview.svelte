<script lang="ts">
	import { Marked, marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Content } from './ui/collapsible';
    import 'highlight.js/styles/base16/one-light.css'

	const myMarked = new Marked(
		markedHighlight({
			emptyLangClass: 'hljs',
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'shell';
				return hljs.highlight(code, { language }).value;
			}
		})
	);

	export let markdown: string = '';
</script>

<Card.Root>
	<Card.Content>
		{@html myMarked.parse(markdown)}
	</Card.Content>
</Card.Root>
