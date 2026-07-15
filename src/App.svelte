<script>
  // App shell：grid 佈局。每個子元件的根節點自帶 grid-area
  // 對應的 class（.nav/.stage/.know/.tutor），直接落位。
  import SideNav from './components/SideNav.svelte';
  import Stage from './components/Stage.svelte';
  import Tutor from './components/Tutor.svelte';
  import Home from './components/Home.svelte';
  import Interview from './components/Interview.svelte';
  import { nav } from './stores/state.svelte.js';
</script>

<div class="app">
  <SideNav />
  {#if nav.mode === 'interview'}
    <Interview />
  {:else if nav.current == null}
    <Home />
  {:else}
    <Stage />
    <Tutor />
  {/if}
</div>
