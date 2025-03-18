<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import * as Resizable from '$lib/components/ui/resizable';
    import Textarea from '@/components/ui/textarea/textarea.svelte';
    import MarkdownPreview from '@/components/markdown-preview.svelte';

    let markdownText: string

</script>


<Card.Root>
    <Card.Content>
        <Resizable.PaneGroup direction="horizontal" class="min-h-[200px] rounded-lg border">
            <Resizable.Pane>
                <Textarea
                    placeholder="write your idea~"
                    bind:value={markdownText}
                    class="full-height .hide-scrollbar"
                ></Textarea>
            </Resizable.Pane>
            <Resizable.Handle withHandle/>
            <Resizable.Pane defaultSize={45}>
                <MarkdownPreview {markdownText}/>
            </Resizable.Pane>
        </Resizable.PaneGroup>
    </Card.Content>
</Card.Root>

<style>
    :global(.full-height) {
		height: 100vh;
	}

	:global(.hide-scrollbar) {
		scrollbar-width: none;
	}

	:global(.hide-scrollbar)::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}
</style>
