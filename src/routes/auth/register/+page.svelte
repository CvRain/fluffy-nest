<script lang="ts">
	import { fade, fly} from 'svelte/transition';
	import type { PageServerData } from './$types';
	import * as Card from '$lib/components/ui/card/index';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { goto } from '$app/navigation';
	import { FormButton, FormField, FormLabel, FormControl } from '$lib/components/ui/form/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerFormSchema } from '../schema';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	import CircleAlert from "lucide-svelte/icons/circle-alert";
	import * as Alert from "$lib/components/ui/alert/index";
	import { API_BASE_URL } from '$lib/config';
	import axios from 'axios';


	let { data }: { data: PageServerData } = $props();
	let enableRegister: boolean = $state(true);

	const form = superForm(data.form, {
		validators: zodClient(registerFormSchema)
	});

	const { form: formData, enhance } = form;

	// 检查是否允许注册
	async function checkEnableRegister() {
		try {
			const response = await axios.get(`${API_BASE_URL}/check/enable_register`);
			const responseData = response.data;
			if (responseData.code === 200) {
				enableRegister = true;
			} else if (responseData.code === 403) {
				enableRegister = false;
			}
		} catch (error) {
			console.error('Error checking enable register:', error);
			enableRegister = false;
		}
	}

	onMount(async () => {
		// 页面加载时检查是否允许注册
		await checkEnableRegister();
	});
</script>

<!--将警告消息移动到右上角-->
<div class="fixed top-4 right-4 z-50 w-96" in:fly={{duration:300, x:300}} out:fade>
	{#if !enableRegister}
		<Alert.Root variant="destructive">
			<CircleAlert class="size-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>
				Registration is currently disabled.
			</Alert.Description>
		</Alert.Root>
	{/if}
</div>

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
					<FormButton type="submit" class="w-full" style="margin-top: 1rem;" disabled={!enableRegister}>Register
					</FormButton>
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
