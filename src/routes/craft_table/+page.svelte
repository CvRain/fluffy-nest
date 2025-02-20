<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib/components/app-sidebar.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
    import { API_BASE_URL } from "$lib/config";
	import axios from "axios";

    let { children } = $props();
    let email: string = $state('');
    let token: string = $state('');

    //像后端请求当前用户的articles
    const getArticles = async () => {
        
    }

    //检查用户当前的登录状态
    const checkLogin = async () => {
        //检查网页存储的内容中是否存在token字段，不存在则重定向回登录界面
        if (!localStorage.getItem('token')) {
            goto('/auth/login');
        }
        token = localStorage.getItem('token');

        const config = {
            method: 'GET',
            url: '${API_BASE_URL}/api/user/login/user',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const response = await axios(config);
        console.log(response);

    }

    onMount(() => {
        
    });
</script>

<Sidebar.Provider>
    <AppSidebar />
    <main>
        <Sidebar.Trigger />
        {@render children?.()}
    </main>
</Sidebar.Provider>