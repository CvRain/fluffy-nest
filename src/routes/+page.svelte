<script lang="ts">
  import Login from "../components/Login.svelte"
  import Register from '../components/Register.svelte';
  import { fade, fly } from 'svelte/transition';
  import { crossfade } from 'svelte/transition';
  
  let showLogin = true;
  
  const toggleView = () => {
    showLogin = !showLogin;
  }

  function fadeAndFly(node, {
    delay = 0,
    duration = 300,
    y = 50
  }) {
    return {
      delay,
      duration,
      css: (t:number) => `
        opacity: ${t};
        transform: translateY(${(1 - t) * y}px);
      `
    };
  }
</script>

<main>
  <div class="form-container">
    {#if showLogin}
      <div transition:fadeAndFly={{duration: 300, delay: 300}}>
        <Login {toggleView} />
      </div>
    {:else}
      <div transition:fadeAndFly={{duration: 300, delay: 300}}>
        <Register {toggleView} />
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 30vh;
  }

  .form-container {
    position: relative;
    width: 100%;
    max-width: 24rem; /* 等于 max-w-sm */
  }

  .form-container > div {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
  }
</style>