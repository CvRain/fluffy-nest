<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { goto } from '$app/navigation'; // 导入goto用于页面跳转
	import {API_BASE_URL} from '$lib/config';
	import axios from 'axios';
	import { onMount } from 'svelte';

	export let toggleView: () => void;

	let email = '';
	let password = '';

	const handleTokenLogin = async () => {
		//从cookie中获取token
		const token = document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];

		const config = {
			method: 'get',
			url: `${API_BASE_URL}/user/login/token`,
			headers: {
				'Authorization': token
			}
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
	}


	const handleLogin = async () => {
		try {
			const requestUrl = `${API_BASE_URL}/api/user/login`;
			const response = await fetch(requestUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Login successful:', data);
				await goto('/craft_table'); // 登录成功后跳转到craft_table页面
			} else {
				console.error('Login failed:', response.statusText);
			}
		} catch (error) {
			console.error('Error during login:', error);
		}
	};

	onMount(handleTokenLogin)
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" required bind:value={email} />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
					<a href="##" class="ml-auto inline-block text-sm underline">
						Forgot your password?
					</a>
				</div>
				<Input id="password" type="password" required bind:value={password} />
			</div>
			<Button type="button" class="w-full" onclick={handleLogin}>Login</Button> <!-- 修改按钮类型为button并绑定点击事件 -->
		</div>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<button class="underline" on:click={toggleView}>Sign up</button>
		</div>
	</Card.Content>
</Card.Root>