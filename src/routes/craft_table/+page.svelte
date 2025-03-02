<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import CraftTableSidebar from '$lib/components/craft_table_sidebar.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { API_BASE_URL } from '$lib/config';
	import axios from 'axios';
	import type { BaseResponse } from '$lib/schema';
	import { fly, fade } from 'svelte/transition';
	import * as Alert from '$lib/components/ui/alert';
	import { CircleAlert } from 'lucide-svelte';
	import { fetchUserData, fetchUserInfo, getStoredToken, getStoredUserId } from './request';

	let { children } = $props();
	let showAlert: boolean = $state(false);
	let alertType: 'default' | 'destructive' = $state('default');
	let alertMessage = $state('');

	const checkTokenExist = (): boolean => {
		const token = getStoredToken()

		return !!token && token != 'undefined' && token != 'null' && token != '' && token?.length > 20;
	};

	//检查用户当前的登录状态
	const checkLogin = async () => {
		console.debug('enter checkLogin');
		const token = getStoredToken();

		if (!checkTokenExist()) {
			alertType = 'destructive';
			alertMessage = '请先登录';
			showAlert = true;
			return false;
		}

		try {
			const config = {
				method: 'get',
				url: `${API_BASE_URL}/user/login/token`,
				headers: {
					'Authorization': token
				}
			};

			const result = await axios(config);
			const responseData: BaseResponse = result.data;
			console.debug(responseData);

			if (responseData.code === 200) {
				alertType = 'default';
				alertMessage = 'welcome back';
				showAlert = true;

				setTimeout(() => {
					showAlert = false;
				}, 2000);

				return true;
			}

			alertMessage = responseData.result || 'check error';
			showAlert = true;

			setTimeout(() => {
				goto('/auth/login');
			}, 2000);
			return false;

		} catch (e) {
			alertType = 'destructive';
			alertMessage = '网络请求异常';
			showAlert = true;
			setTimeout(() => {
				goto('/auth/login');
			}, 2000);
			console.log(e);
			return false;
		}
	};

	onMount(async () => {
		const checkResult = await checkLogin();
		if (!checkResult) {
			return;
		}

		const token = getStoredToken();
		const userId = getStoredUserId();

		await fetchUserInfo(token, userId)
		await fetchUserData(token, userId)
	});
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

<Sidebar.Provider>
	<CraftTableSidebar />
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
