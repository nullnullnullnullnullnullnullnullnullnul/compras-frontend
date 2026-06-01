export type TipoNotificacion = 'exito' | 'error' | 'advertencia' | 'info';

export interface Notificacion {
  id:       string;
  tipo:     TipoNotificacion;
  mensaje:  string;
  duracion: number;
}

class NotificacionesStore {
  lista = $state<Notificacion[]>([]);

  agregar(
    mensaje:  string,
    tipo:     TipoNotificacion = 'info',
    duracion: number           = 3000,
  ): void {
    const id = crypto.randomUUID();

    this.lista = [
      ...this.lista,
      { id, tipo, mensaje, duracion },
    ];

    setTimeout(() => this.eliminar(id), duracion);
  }

  eliminar(id: string): void {
    this.lista = this.lista.filter(n => n.id !== id);
  }

  limpiar(): void {
    this.lista = [];
  }

  exito(mensaje:      string, duracion?: number): void {
    this.agregar(mensaje, 'exito',      duracion);
  }

  error(mensaje:      string, duracion?: number): void {
    this.agregar(mensaje, 'error',      duracion);
  }

  advertencia(mensaje: string, duracion?: number): void {
    this.agregar(mensaje, 'advertencia', duracion);
  }

  info(mensaje:       string, duracion?: number): void {
    this.agregar(mensaje, 'info',       duracion);
  }
}

export const notificaciones = new NotificacionesStore();