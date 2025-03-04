<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { PageServerData } from './$types';
	import * as Card from '$lib/components/ui/card/index';
	import * as Alert from '$lib/components/ui/alert/index';
	import { CircleAlert, UserRound } from 'lucide-svelte';
	import { CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { goto } from '$app/navigation';
	import {
		FormButton,
		FormField,
		FormLabel,
		FormControl,
		FormFieldErrors
	} from '$lib/components/ui/form/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginFormSchema, type LoginResponse } from '../schema';
	import { Input } from '$lib/components/ui/input';
	import { browser } from '$app/environment';
	import type { BaseResponse } from '$lib/schema';

	let { data }: { data: PageServerData } = $props();
	let showAlert = $state(false);
	let alertMessage = $state('');
	let alertType: 'default' | 'destructive' = $state('default');

	const form = superForm(data.form, {
		validators: zodClient(loginFormSchema),
		onResult: ({ result }) => {
			const response:LoginResponse = result.data as unknown as LoginResponse;
			console.log('response: ', response);

			showAlert = true;
			if (response.code === 200) {
				alertType = 'default';
				alertMessage = response.message;

				if (browser) {
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('email', response.data.email);
					localStorage.setItem('userId', response.data.id);
				}

				setTimeout(() => {
					goto('/craft_table');
				}, 3000);
			} else {
				alertType = 'destructive';
				alertMessage = response.message;
			}

			return result;
		}
	});

	const { form: formData, enhance } = form;
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
							<Input
								{...props}
								bind:value={$formData.email}
								type="email"
								placeholder="john@doe.com"
							/>
						{/snippet}
					</FormControl>
					<FormFieldErrors />
				</FormField>
				<FormField {form} name="password">
					<FormControl>
						{#snippet children({ props })}
							<FormLabel>Password</FormLabel>
							<Input {...props} bind:value={$formData.password} type="password" placeholder="" />
						{/snippet}
					</FormControl>
				</FormField>
				<FormButton type="submit" class="w-full" style="margin-top: 1rem;">Login</FormButton>
			</form>
		</CardContent>
		<CardFooter>
			<div class="mt-4 flex text-center text-sm text-muted-foreground">
				Don't have an account? &nbsp;&nbsp;
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
