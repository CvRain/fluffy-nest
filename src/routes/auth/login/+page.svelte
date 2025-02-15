<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';
	import * as Card from '$lib/components/ui/card/index';
	import { CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { goto } from '$app/navigation';
	import { FormButton, FormField, FormLabel, FormControl, FormFieldErrors } from '$lib/components/ui/form/index.js';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginFormSchema } from '../schema';
	import { Input } from '$lib/components/ui/input';

	let { data }: { data: PageServerData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(loginFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<main transition:fade>
	<Card.Root class="mx-auto max-w-sm">
		<CardHeader>
			<CardTitle class="text-2xl">Login</CardTitle>
			<CardDescription>Enter your email below to login to your account</CardDescription>
		</CardHeader>
		<CardContent>
			<form method="POST" use:enhance action="?/login">
				<FormField {form} name="email">
					<FormControl>
						{#snippet children({ props })}
							<FormLabel>Email</FormLabel>
							<Input {...props} bind:value={$formData.email} type="email" placeholder="john@doe.com" />
						{/snippet}
					</FormControl>
					<FormFieldErrors />
				</FormField>
				<FormField {form} name="password">
					<FormControl>
						{#snippet children({ props })}
							<FormLabel>Password</FormLabel>
							<Input {...props} bind:value={$formData.password} type="password" placeholder="••••••••" />
						{/snippet}
					</FormControl>
				</FormField>
				<FormButton type="submit" class="w-full" style="margin-top: 1rem;">Login</FormButton>
			</form>
		</CardContent>
		<CardFooter>
			<div class="mt-4 text-center text-sm text-muted-foreground flex">
				Don't have an account? &nbsp;&nbsp;
				<button onclick={() => goto('/auth/register')} class="underline">Register here</button>
			</div>
		</CardFooter>
	</Card.Root>
</main>
<SuperDebug data={form} />

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }
</style>
