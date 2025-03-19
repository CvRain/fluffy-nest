<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardDescription, CardTitle } from '@/components/ui/card';
	import { CardContent } from '@/components/ui/card';
	import { CardHeader } from '@/components/ui/card';
	import { Avatar } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Sun, Moon, X, Menu, Github } from 'lucide-svelte';

	import { resetMode, setMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';

	// 示例数据
	const featuredPosts = [
		{
			title: '与Svelte共舞',
			excerpt: '探索响应式编程的优雅之道',
			author: 'tech-owl',
			date: '2024-03-15',
			category: '技术'
		},
		{
			title: '城市漫步指南',
			excerpt: '发现街头巷尾的隐藏美学',
			author: 'urban-explorer',
			date: '2024-03-14',
			category: '生活'
		},
		{
			title: '咖啡哲学',
			excerpt: '从一杯手冲看人生百态',
			author: 'caffeine-thinker',
			date: '2024-03-13',
			category: '随笔'
		}
	];

	let isMenuOpen = false;

	const gotoLogin = () => {
		goto("/auth/login")
	};
</script>

<svelte:head>
	<title>FluffyNest 芸窗文薮 - 温暖的文字栖息地</title>
</svelte:head>

<div
	class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
	<nav class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
		<div class="container mx-auto px-4">
			<div class="flex h-16 items-center justify-between">
				<!-- 左侧品牌 -->
				<div class="flex items-center gap-2">
					<span class="text-2xl font-bold text-amber-600 dark:text-amber-400">🪶 Fluffy Nest</span>
				</div>

				<!-- 桌面导航 -->
				<div class="hidden items-center gap-6 md:flex">
					<Button variant="ghost">

						发现
					</Button>
					<Button variant="ghost">分类</Button>
					<Button variant="ghost">关于</Button>

					<!-- 切换主题按钮 -->
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							class={buttonVariants({ variant: "outline", size: "icon" })}
						>
							<Sun
								class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
							/>
							<Moon
								class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
							/>
							<span class="sr-only">Toggle theme</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item onclick={() => setMode("light")}>Light
							</DropdownMenu.Item
							>
							<DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
							<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>

					<Button variant="default" onclick={gotoLogin}>开始写作</Button>
				</div>

				<!-- 移动菜单按钮 -->
				<Button
					variant="ghost"
					size="icon"
					class="md:hidden"
					onclick={() => (isMenuOpen = !isMenuOpen)}
				>
					{#if isMenuOpen}
						<X class="h-5 w-5" />
					{:else}
						<Menu class="h-5 w-5" />
					{/if}
				</Button>
			</div>

			<!-- 移动菜单 -->
			{#if isMenuOpen}
				<div class="absolute inset-x-0 top-16 z-50 border-t bg-white p-4 dark:bg-slate-900 md:hidden">
					<div class="space-y-4">
						<Button variant="ghost" class="w-full justify-start">发现</Button>
						<Button variant="ghost" class="w-full justify-start">分类</Button>
						<Button variant="ghost" class="w-full justify-start">关于</Button>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger
								class={buttonVariants({ variant: "outline", size: "icon" })}
							>
								<Sun
									class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
								/>
								<Moon
									class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
								/>
								<span class="sr-only">Toggle theme</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Item onclick={() => setMode("light")}>Light
								</DropdownMenu.Item
								>
								<DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
								<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
						<Button variant="default" class="w-full" onclick={gotoLogin}>开始写作</Button>
					</div>
				</div>
			{/if}
		</div>
	</nav>

	<!-- 主内容区 -->
	<main class="flex-1 container mx-auto px-4 py-12 md:py-24">
		<!-- Hero Section -->
		<section class="mb-24 text-center">
			<div class="mx-auto max-w-3xl">
				<h1 class="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl">
					字落松烟处，
					<span class="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
           文成鹤梦乡
          </span>
				</h1>
				<p class="mb-8 text-xl text-slate-600 dark:text-slate-400 md:text-2xl">
					一个让思想自由栖息的社区平台，用文字编织属于你的自在世界
				</p>
				<div class="flex justify-center gap-4">
					<Button size="lg" onclick={() => {window.location.href = "https://github.com/CvRain/fluffy-nest"}}>
						<Github />
						立即探索
					</Button>
				</div>
			</div>
		</section>

		<!-- Featured Posts -->
		<section class="mb-24">
			<h2 class="mb-8 text-3xl font-bold text-slate-900 dark:text-slate-100">精选羽毛</h2>
			<div class="grid gap-6 md:grid-cols-3">
				{#each featuredPosts as post}
					<Card class="hover:shadow-lg transition-shadow">
						<CardHeader>
							<Badge variant="secondary">{post.category}</Badge>
							<CardTitle class="mt-4">{post.title}</CardTitle>
							<CardDescription>{post.excerpt}</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="flex items-center gap-3">
								<Avatar src="/avatars/{post.author}.jpg" />
								<div>
									<p class="text-sm font-medium">@{post.author}</p>
									<p class="text-sm text-slate-500">{post.date}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</section>

		<!-- CTA Section -->
		<section class="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center text-white">
			<div class="mx-auto max-w-2xl">
				<h2 class="mb-4 text-3xl font-bold">且就芸窗侧，同煨文字香</h2>
				<p class="mb-8 text-lg opacity-90">
					准备好落笔了吗？ 开始书写你的故事吧！
				</p>
				<div class="flex justify-center gap-4">
					<Button variant="secondary" size="lg" onclick={() => {goto("/auth/register")}}>立即注册</Button>
					<Button variant="secondary" size="lg">浏览示例</Button>
				</div>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t bg-white dark:bg-slate-900 mt-auto">
		<div class="container mx-auto px-4 py-8">
			<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <span class="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">
          &copy; 2025 Fluffy Nest.
        </span>
				<div class="flex flex-wrap justify-center gap-4">
					<Button variant="ghost" size="sm" class="px-3 py-1.5">by Claude Rainer</Button>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
    /* 优化过渡效果 */
    :global(html) {
        @apply transition-colors duration-300;
    }

    :global(body) {
        @apply bg-background text-foreground transition-colors duration-300;
    }

    /* 导航栏过渡 */
    nav {
        @apply transition-all duration-300;
    }

    /* 卡片过渡 */
    :global(.card-transition) {
        @apply transition-all duration-300 ease-out;
    }
</style>