<script lang="ts">
    import Login from "../../components/Login.svelte"
    import Register from '../../components/Register.svelte';
    import { fade } from 'svelte/transition';  
  
    let showLogin = true;
    
    const toggleView = () => {
      showLogin = !showLogin;
    }
  </script>
  
  <main>
    <div class="form-container">
      {#if showLogin}
        <div in:fade={{duration: 150, delay: 150}}>
          <Login {toggleView} />
        </div>
      {:else}
        <div in:fade={{duration: 150, delay: 150}}>
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