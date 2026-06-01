import type { Usuario } from '$lib/types';

class SesionStore {
  usuario  = $state<Usuario | null>(null);
  cargando = $state(false);

  estaAutenticado = $derived(this.usuario !== null);

  setUsuario(usuario: Usuario | null): void {
    this.usuario = usuario;
  }

  setCargando(cargando: boolean): void {
    this.cargando = cargando;
  }

  cerrarSesion(): void {
    this.usuario = null;
  }
}

export const sesion = new SesionStore();