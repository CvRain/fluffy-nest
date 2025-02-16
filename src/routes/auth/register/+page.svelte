<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';
	import * as Card from '$lib/components/ui/card/index';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { goto } from '$app/navigation';
	import { FormButton, FormField, FormLabel, FormControl } from '$lib/components/ui/form/index.js';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerFormSchema } from '../schema';
	import { Input } from '$lib/components/ui/input';

	let { data }: { data: PageServerData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(registerFormSchema)
	});

	const { form: formData, enhance } = form;

</script>

<main transition:fade>
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Register</Card.Title>
			<Card.Description>Let's create your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance action="?/register">
				<FormField {form} name="email">
					<FormControl>
						{#snippet children({ props })}
							<FormLabel>Email</FormLabel>
							<Input {...props} bind:value={$formData.email} type="email" placeholder="john@doe.com" />
						{/snippet}
					</FormControl>
				</FormField>
				<FormField {form} name="name">
					<FormControl>
						{#snippet children({ props })}
							<FormLabel>Name</FormLabel>
							<Input {...props} bind:value={$formData.name} type="text" placeholder="John Doe" />
						{/snippet}
					</FormControl>
				</FormField>
				<FormField {form} name="password">
					<FormControl>
						{#snippet children({ props })}
							<FormLabel>Password</FormLabel>
							<Input {...props} bind:value={$formData.password} type="password" placeholder="" />
						{/snippet}
					</FormControl>
				</FormField>
				<FormField {form} name="confirmPassword">
					<FormControl>
						{#snippet children({ props })}
							<FormLabel>Confirm password</FormLabel>
							<Input {...props} bind:value={$formData.confirmPassword} type="password" placeholder="" />
						{/snippet}
					</FormControl>
					<FormButton type="submit" class="w-full" style="margin-top: 1rem;">Login</FormButton>
				</FormField>
				<CardFooter>
					<div class="mt-4 text-center text-sm text-muted-foreground flex">
						Already have an account?
						<button onclick={() => goto('/auth/login')} class="underline">Login here</button>
					</div>
				</CardFooter>
			</form>
		</Card.Content>
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
