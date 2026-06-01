<script lang="ts">
  import { goto } from '$app/navigation';

  type Props = {
    onperfil: () => void;
    onlogout: () => Promise<void>;
  };

  let { onperfil, onlogout }: Props = $props();
</script>

<div
  role="menu"
  aria-label="Opciones de usuario"
  class="bg-color-surface border border-color-border rounded-2xl shadow-md overflow-hidden min-w-45"
>
  <button
    role="menuitem"
    onclick={() => { onperfil(); goto('/perfil'); }}
    class="flex items-center gap-3 w-full px-4 py-3 text-sm text-color-text hover:bg-color-bg transition-colors focus-visible:outline-2 focus-visible:outline-primary"
  >
    <svg class="w-4 h-4 text-color-text-muted" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
    Perfil
  </button>

  <div class="h-px bg-color-border mx-3"></div>

  <button
    role="menuitem"
    onclick={onlogout}
    class="flex items-center gap-3 w-full px-4 py-3 text-sm text-color-danger hover:bg-color-bg transition-colors focus-visible:outline-2 focus-visible:outline-primary"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/>
    </svg>
    Cerrar sesión
  </button>
</div>