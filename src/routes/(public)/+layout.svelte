<script lang="ts">
  let { children } = $props();
</script>

<div class="flex flex-col h-dvh max-w-md mx-auto bg-white overflow-hidden">
  {@render children()}
</div>