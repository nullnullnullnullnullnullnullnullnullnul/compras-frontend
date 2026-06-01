<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center h-dvh gap-4">
  <h1 class="text-4xl font-bold text-gray-800">{$page.status}</h1>
  <p class="text-gray-500">{$page.error?.message ?? 'Algo salió mal'}</p>
  <a href="/" class="text-primary font-medium">Volver al inicio</a>
</div>