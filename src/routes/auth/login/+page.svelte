<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData, PageServerLoad } from './$types';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superValidate } from 'sveltekit-superforms';
	import { loginFormSchema } from '../schema';
	import * as Card from '$lib/components/ui/card';
	import { CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import PageLogin from './page-login.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { goto } from '$app/navigation';

	export const load: PageServerLoad = async () => {
		return {
			from: await superValidate(zod(loginFormSchema))
		};
	};

	let { data }: { data: PageData } = $props();
</script>

<main transition:fade>
	<Card.Root class="mx-auto max-w-sm">
		<CardHeader>
			<CardTitle class="text-2xl">Login</CardTitle>
			<CardDescription>Enter your email below to login to your account</CardDescription>
		</CardHeader>
		<CardContent>
			<PageLogin {data} />
		</CardContent>
		<CardFooter>
			<div class="mt-4 text-center text-sm text-muted-foreground flex">
				Don't have an account?
				<button onclick={() => goto('/auth/register')} class="underline">Register here</button>
			</div>
		</CardFooter>
	</Card.Root>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}
</style>
