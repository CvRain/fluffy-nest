<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Register</Card.Title>
		<Card.Description>Let's create your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" required bind:value={email} />
				{#if emailError}
					<p class="text-red-500 text-sm">{emailError}</p>
				{/if}
			</div>
			<div class="grid gap-2">
				<Label for="name">Name</Label>
				<Input id="name" type="text" placeholder="unknown" required bind:value={name} />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
				</div>
				<Input id="password" type="password" required bind:value={password} />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="confirm-password">Confirm password</Label>
				</div>
				<Input id="confirm-password" type="password" required bind:value={confirmPassword} />
				{#if passwordError}
					<p class="text-red-500 text-sm">{passwordError}</p>
				{/if}
			</div>
			<Button type="submit" class="w-full" disabled={!isFormValid()} onclick={handleRegister}>Sign up</Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Account exist?
			<button class="underline" on:click={toggleView}>Sign in</button>
		</div>
	</Card.Content>
</Card.Root>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import axios from 'axios';

	let password: string = '';
	let confirmPassword: string = '';
	let email: string = '';
	let name: string = '';
	let emailError: string = '';
	let passwordError: string = '';

	export let toggleView: () => void;

	const handleRegister = async () => {
		let data = JSON.stringify({
			"name": name,
			"password": password,
			"email": email
		});

		const config = {
			method: 'post',
			url: 'http://localhost:4000/api/user/append',
			headers: {
				'Content-Type': 'application/json'
			},
			data : data
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const isFormValid = () => {
		emailError = '';
		passwordError = '';

		if (!validateEmail(email)) {
			emailError = 'Please enter a valid email address.';
			return false;
		}

		if (password !== confirmPassword) {
			passwordError = 'Passwords do not match.';
			return false;
		}

		return true;
	};

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};




</script>
