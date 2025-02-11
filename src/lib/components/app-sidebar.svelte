<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from '$lib/components/ui/sidebar/index.js';

	// Menu items.
	const items = [
		{
			title: 'Home',
			url: '#',
			icon: House
		},
		{
			title: 'Inbox',
			url: '#',
			icon: Inbox
		},
		{
			title: 'Calendar',
			url: '#',
			icon: Calendar
		},
		{
			title: 'Search',
			url: '#',
			icon: Search
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings
		}
	];

	const fruits = [
		{
			title: 'Apple',
			url: '#'
		},
		{
			title: 'Banana',
			url: '#'
		},
		{
			title: 'Cherry',
			url: '#'
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<SidebarGroup>
			<SidebarGroupLabel>Another Group</SidebarGroupLabel>
			<Sidebar.GroupContent>
				<SidebarMenu>
					{#each fruits as fruit (fruit.title)}
						<SidebarMenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<span>{fruit.title}</span>
								{/snippet}
							</Sidebar.MenuButton>
						</SidebarMenuItem>
					{/each}
				</SidebarMenu>
			</Sidebar.GroupContent>
		</SidebarGroup>
	</Sidebar.Content>
</Sidebar.Root>