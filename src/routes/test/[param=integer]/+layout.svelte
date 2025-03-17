<script lang="ts">
    import Slash from "@lucide/svelte/icons/slash";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
    <Breadcrumb.List>
        <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
            <Slash/>
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
            <Breadcrumb.Link href="/test">Test</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
            <Slash/>
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
            <Breadcrumb.Page>numbers</Breadcrumb.Page>
        </Breadcrumb.Item>
    </Breadcrumb.List>
</Breadcrumb.Root>

<slot/>