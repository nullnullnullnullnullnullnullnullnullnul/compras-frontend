<script lang="ts">
  import type { Usuario } from '$lib/types';

  type Props = {
    usuario: Usuario | null;
    size: 'sm' | 'md' | 'lg';
  };

  let { usuario, size }: Props = $props();

  const sizeClass = {
    sm:  'w-8 h-8 text-sm',
    md:  'w-10 h-10 text-base',
    lg:  'w-16 h-16 text-xl',
  }[size];

  const initials = $derived(
    usuario?.nombre
      ? usuario.nombre.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
      : '?'
  );
</script>

{#if usuario?.foto_url}
  <img
    src={usuario.foto_url}
    alt={usuario.nombre}
    class="rounded-full object-cover {sizeClass}"
  />
{:else}
  <div
    class="rounded-full bg-primary text-white flex items-center justify-center font-semibold shrink-0 {sizeClass}"
    aria-hidden="true"
  >
    {initials}
  </div>
{/if}