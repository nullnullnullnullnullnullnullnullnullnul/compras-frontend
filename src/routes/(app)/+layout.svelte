<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Usuario } from '$lib/types';
  import { page }          from '$app/stores';
  import { goto }          from '$app/navigation';
  import { sesion }        from '$lib/stores/sesion.svelte';
  import { authService }   from '$lib/services/api/auth';
  import NavIcon      from '$lib/components/layout/NavIcon.svelte';
  import UserAvatar   from '$lib/components/layout/UserAvatar.svelte';
  import UserDropdown from '$lib/components/layout/UserDropdown.svelte';

  interface LayoutData {
    usuario?: Usuario;
  }

  let { children, data }: { children: Snippet; data: LayoutData } = $props();

  $effect(() => {
    if (data.usuario) {
      sesion.setUsuario(data.usuario);
    }
  });

  type NavItem = {
    href:  string;
    label: string;
    match: string;
  };

  const navItems: NavItem[] = [
    { href: '/productos', label: 'Buscar', match: '/productos' },
    { href: '/listas',    label: 'Listas', match: '/listas'   },
    { href: '/mapa',      label: 'Mapa',   match: '/mapa'     },
    { href: '/chatbot',   label: 'Chat',   match: '/chatbot'  },
    { href: '/perfil',    label: 'Perfil', match: '/perfil'   },
  ];

  function isActive(match: string): boolean {
    return $page.url.pathname.startsWith(match);
  }

  let menuAbierto = $state(false);

  function toggleMenu(): void  { menuAbierto = !menuAbierto; }
  function cerrarMenu(): void  { menuAbierto = false; }

  async function logout(): Promise<void> {
    cerrarMenu();
    try {
      await authService.logout();
    } finally {
      sesion.cerrarSesion();
      await goto('/login');
    }
  }

  function handleOutsideClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('[data-user-menu]')) cerrarMenu();
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') cerrarMenu();
  }
</script>

<svelte:window onclick={handleOutsideClick} onkeydown={handleKeydown} />

<a
  href="#contenido-principal"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-medium"
>
  Saltar al contenido principal
</a>

<div class="flex h-dvh max-w-7xl mx-auto bg-color-bg">

  <!-- ── Desktop sidebar ── -->
  <nav
    aria-label="Navegación principal"
    class="hidden lg:flex flex-col w-64 bg-color-surface border-r border-color-border shrink-0"
  >
    <a href="/productos" class="flex items-center gap-3 px-6 py-5 focus-visible:outline-2 focus-visible:outline-primary">
      <img src="/green-cart.png" alt="La Góndola" class="w-8 h-8" />
      <span class="font-bold text-lg text-color-text">La Góndola</span>
    </a>

    <div class="h-px bg-color-border mx-4"></div>

    <ul class="flex flex-col gap-1 p-4 flex-1" role="list">
      {#each navItems as item}
        {@const active = isActive(item.match)}
        <li>
          <a
            href={item.href}
            aria-current={active ? 'page' : undefined}
            class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary
              {active ? 'bg-primary text-white' : 'text-color-text hover:bg-color-bg'}"
          >
            <NavIcon label={item.label} {active} size="md" />
            {item.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="p-4 border-t border-color-border" data-user-menu>
      <button
        onclick={toggleMenu}
        aria-expanded={menuAbierto}
        aria-haspopup="menu"
        aria-label="Menú de usuario"
        class="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-color-bg transition-colors focus-visible:outline-2 focus-visible:outline-primary"
      >
        <UserAvatar usuario={sesion.usuario} size="sm" />
        <span class="flex-1 text-left text-sm font-medium text-color-text truncate">
          {sesion.usuario?.nombre ?? 'Usuario'}
        </span>
        <svg class="w-4 h-4 text-color-text-muted transition-transform {menuAbierto ? 'rotate-180' : ''}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {#if menuAbierto}
        <UserDropdown onperfil={cerrarMenu} onlogout={logout} />
      {/if}
    </div>
  </nav>

  <!-- ── Main content ── -->
  <div class="flex flex-col flex-1 min-w-0">

    <!-- ── Mobile header ── -->
    <header class="lg:hidden flex items-center justify-between px-4 py-3 bg-color-surface border-b border-color-border shrink-0">
      <a href="/productos" class="focus-visible:outline-2 focus-visible:outline-primary rounded-lg">
        <img src="/green-cart.png" alt="La Góndola" class="w-8 h-8 -translate-x-1" />
      </a>

      <div data-user-menu class="relative">
        <button
          onclick={toggleMenu}
          aria-expanded={menuAbierto}
          aria-haspopup="menu"
          aria-label="Menú de usuario"
          class="flex items-center justify-center w-11 h-11 rounded-full focus-visible:outline-2 focus-visible:outline-primary"
        >
          <UserAvatar usuario={sesion.usuario} size="sm" />
        </button>

        {#if menuAbierto}
          <div class="absolute right-0 top-12 z-50">
            <UserDropdown onperfil={cerrarMenu} onlogout={logout} />
          </div>
        {/if}
      </div>
    </header>

    <main id="contenido-principal" class="flex-1 overflow-y-auto" tabindex="-1">
      {@render children()}
    </main>

    <!-- ── Mobile bottom nav ── -->
    <nav
      aria-label="Navegación principal"
      class="lg:hidden flex items-center justify-around border-t border-color-border bg-color-surface px-2 py-1 shrink-0"
    >
      {#each navItems as item}
        {@const active = isActive(item.match)}
        <a
          href={item.href}
          aria-current={active ? 'page' : undefined}
          aria-label={item.label}
          class="flex flex-col items-center justify-center gap-0.5 min-w-11 min-h-11 px-2 py-1 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-primary
            {active ? 'text-primary' : 'text-color-text-muted'}"
        >
          <NavIcon label={item.label} {active} size="sm" />
          <span class="text-[11px] font-medium">{item.label}</span>
          <span class="h-0.5 w-4 rounded-full {active ? 'bg-primary' : 'bg-transparent'}"></span>
        </a>
      {/each}
    </nav>
  </div>
</div>