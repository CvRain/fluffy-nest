<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import CraftTableSidebar from '$lib/components/craft_table_sidebar.svelte';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import * as Alert from '$lib/components/ui/alert';
	import { CircleAlert } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import * as Card from '$lib/components/ui/card/index.js';
	import { code } from '@cartamd/plugin-code';
	import '@cartamd/plugin-code/default.css';
	import { emoji } from '@cartamd/plugin-emoji';
	import { slash } from '@cartamd/plugin-slash';
	import { attachment } from '@cartamd/plugin-attachment';

	let showAlert: boolean = $state(false);
	let alertType: 'default' | 'destructive' = $state('default');
	let alertMessage = $state('');
	let markdownText = $state('');

	const carta = new Carta({
		sanitizer: false,
		extensions: [
			emoji(),
			slash(),
			code(),
			attachment({
				async upload() {
					return '';
				}
			})
		]
	});

	onMount(() => {
		alertType = 'default';
	});
</script>

<div class="fixed right-4 top-4 z-50 w-96" in:fly={{ duration: 300, x: 300 }} out:fade>
	{#if showAlert}
		<Alert.Root variant={alertType}>
			<CircleAlert class="size-4" />
			<Alert.Title>{alertType === 'destructive' ? 'Error' : 'Success'}</Alert.Title>
			<Alert.Description>
				{alertMessage}
			</Alert.Description>
		</Alert.Root>
	{/if}
</div>

<Sidebar.Provider>
	<CraftTableSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="#">lib</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" />
					<Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="#">components</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" />
					<Breadcrumb.Item>
						<Breadcrumb.Page>button.svelte</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			<Card.Root>
				<Card.Content style="height: 100vh">
				</Card.Content>
			</Card.Root>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>

<style>
</style>
