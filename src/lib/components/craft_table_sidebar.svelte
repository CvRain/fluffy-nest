<script lang="ts" module>
	// This is sample data.
	const data = {
		tree: [
			['lib', ['components', 'button.svelte', 'card.svelte'], 'utils.ts'],
			[
				'routes',
				['hello', '+page.svelte', '+page.ts'],
				'+page.svelte',
				'+page.server.ts',
				'+layout.svelte'
			],
			['static', 'favicon.ico', 'svelte.svg'],
			'eslint.config.js',
			'.gitignore',
			'svelte.config.js',
			'tailwind.config.js',
			'package.json',
			'README.md'
		]
	};
</script>

<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import File from 'lucide-svelte/icons/file';
	import Folder from 'lucide-svelte/icons/folder';
	import type { ComponentProps } from 'svelte';
	import { Footer } from './ui/card';
	import NavUser from './nav-user.svelte';

	interface UserInfo {
		name: string;
		email: string;
		icon: string;
	}

	interface CustomSidebarProps extends ComponentProps<typeof Sidebar.Root> {
		userInfo: UserInfo;
	}

	let { ref = $bindable(null), userInfo, ...restProps }: CustomSidebarProps = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Files</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each data.tree as item, index (index)}
						{@render Tree({ item })}
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Rail />
	<Sidebar.Footer>
		<NavUser user={userInfo}></NavUser>
	</Sidebar.Footer>
</Sidebar.Root>

<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
{#snippet Tree({ item }: { item: string | any[] })}
	{@const [name, ...items] = Array.isArray(item) ? item : [item]}
	{#if !items.length}
		<Sidebar.MenuButton
			isActive={name === 'button.svelte'}
			class="data-[active=true]:bg-transparent"
		>
			<File />
			{name}
		</Sidebar.MenuButton>
	{:else}
		<Sidebar.MenuItem>
			<Collapsible.Root
				class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
				open={name === 'lib' || name === 'components'}
			>
				<Collapsible.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton {...props}>
							<ChevronRight className="transition-transform" />
							<Folder />
							{name}
						</Sidebar.MenuButton>
					{/snippet}
				</Collapsible.Trigger>
				<Collapsible.Content>
					<Sidebar.MenuSub>
						{#each items as subItem, index (index)}
							{@render Tree({ item: subItem })}
						{/each}
					</Sidebar.MenuSub>
				</Collapsible.Content>
			</Collapsible.Root>
		</Sidebar.MenuItem>
	{/if}
{/snippet}
