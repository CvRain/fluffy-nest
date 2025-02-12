<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	function gotoLogin(){
		goto("auth/login")
	}

	onMount(gotoLogin)
</script>