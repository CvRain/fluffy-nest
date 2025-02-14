<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { loginFormSchema } from '../schema';
	import type { LoginFormSchema } from '../schema';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { FormField, FormLabel } from '$lib/components/ui/form';
	import { FormButton, FormControl } from '$lib/components/ui/form/index.js';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<LoginFormSchema>>;
		};
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(loginFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<FormField {form} name="email">
		<FormControl>
			{#snippet children({ props })}
				<FormLabel>email</FormLabel>
				<Input {...props} bind:value={$formData.email} placeholder="m@test.com"></Input>
				<FormLabel>password</FormLabel>
				<Input {...props} bind:value={$formData.password} type="password"></Input>
			{/snippet}
		</FormControl>
		<FormButton type="submit" class="w-full">Login</FormButton>
	</FormField>
</form>
