<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';

	const fetchUserInfo = async () => {
		const data = JSON.stringify({
			'user_id': 'f89ad213-75be-4825-b4c9-022c64491aef'
		});

		const config = {
			method: 'get',
			url: 'http://localhost:4000/api/user/one/id',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		axios(config)
			.then(function(response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function(error) {
				console.log(error);
			});

	};

	const testRequest = async () => {
		const config = {
			method: 'get',
			url: 'http://localhost:4000/api/hello/index',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		axios(config)
			.then(function(response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	const testRequestArg = async () => {
		let url = new URL('http://localhost:4000/api/hello/print_arg');
		url.searchParams.append('message', 'Hello World');
		url.searchParams.append('number', '123');

		const result = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			return response.json();
		})
			.then((data) => {
				console.log(data);
			});

		console.log(result);
	};

	onMount(async () => {
		await testRequest();
		await testRequestArg();
	});
</script>

<main>
	<h1>Hello World</h1>
</main>