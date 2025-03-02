<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';

	const fetchUserInfo = async () => {
		const data = JSON.stringify({
			"user_id": "f89ad213-75be-4825-b4c9-022c64491aef"
		});

		const config = {
			method: 'get',
			url: 'http://localhost:4000/api/user/one/id',
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

	}

	onMount(async () => {
		await fetchUserInfo()
	})
</script>

<main>
	<h1>Hello World</h1>
</main>