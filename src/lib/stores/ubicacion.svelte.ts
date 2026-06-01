export type EstadoUbicacion = 'idle' | 'cargando' | 'ok' | 'error' | 'denegado';

class UbicacionStore {
  latitud  = $state<number | null>(null);
  longitud = $state<number | null>(null);
  estado   = $state<EstadoUbicacion>('idle');
  error    = $state<string | null>(null);

  tieneUbicacion = $derived(
    this.latitud !== null && this.longitud !== null
  );

  setUbicacion(lat: number, lng: number): void {
    this.latitud  = lat;
    this.longitud = lng;
    this.estado   = 'ok';
    this.error    = null;
  }

  setEstado(estado: EstadoUbicacion): void {
    this.estado = estado;
  }

  setError(mensaje: string): void {
    this.error  = mensaje;
    this.estado = 'error';
  }

  limpiar(): void {
    this.latitud  = null;
    this.longitud = null;
    this.estado   = 'idle';
    this.error    = null;
  }
}

export const ubicacion = new UbicacionStore();