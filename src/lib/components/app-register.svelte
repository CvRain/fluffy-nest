<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let toggleView: () => void;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Register</Card.Title>
		<Card.Description>Let's create your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" required />
			</div>
			<div class="grid gap-2">
				<Label for="name">Name</Label>
				<Input id="name" type="text" placeholder="unknown" required />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
				</div>
				<Input id="password" type="password" required />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="confirm-password">Confirm password</Label>
				</div>
				<Input id="confirm-password" type="password" required />
			</div>
			<Button type="submit" class="w-full">Sign up</Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Account exist? 
			<button class="underline" on:click={toggleView}>Sign in</button>
		</div>
	</Card.Content>
</Card.Root>
