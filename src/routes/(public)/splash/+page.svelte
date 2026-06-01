<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    const timer = setTimeout(() => {
      goto('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  });
</script>

<div class="flex h-full w-full items-center justify-center bg-primary">
  <img src="/white-cart.png" alt="La Góndola" class="w-70 h-70 translate-x-0.1" />
</div>