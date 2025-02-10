<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button';

	let { children } = $props();
</script>

{@render children()}

<nav>
	<div>Logo</div>
	<div>
		<Button variant="link">Home</Button>
		<Button variant="link">About</Button>
		<Button variant="link">Contact</Button>
	</div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
				border-bottom: 1px solid #ccc;
				margin-bottom: 1rem;
				width: 100%;
				max-width: 100%;
				overflow: hidden;
    }
</style>