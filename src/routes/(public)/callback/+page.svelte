<script lang="ts">
  import { onMount }        from 'svelte';
  import { goto }           from '$app/navigation';
  import { page }           from '$app/stores';
  import { sesion }         from '$lib/stores/sesion.svelte';
  import { authService }    from '$lib/services/api/auth';
  import { notificaciones } from '$lib/stores/notificaciones.svelte';

  onMount(async () => {
    const error    = $page.url.searchParams.get('error');
    const redirect = $page.url.searchParams.get('redirect') ?? '/productos';

    if (error) {
      notificaciones.error('No se pudo iniciar sesión. Intentá de nuevo.');
      await goto('/login');
      return;
    }

    try {
      sesion.setCargando(true);
      const usuario = await authService.me();
      sesion.setUsuario(usuario);
      await goto(decodeURIComponent(redirect));
    } catch {
      notificaciones.error('No se pudo verificar la sesión. Intentá de nuevo.');
      await goto('/login');
    } finally {
      sesion.setCargando(false);
    }
  });
</script>

<div class="flex h-full w-full items-center justify-center bg-white">
  <div class="flex flex-col items-center gap-4">
    <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <p class="text-color-text-muted text-sm">Iniciando sesión...</p>
  </div>
</div>