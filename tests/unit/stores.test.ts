import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('$app/navigation',  () => ({ goto: vi.fn() }));
vi.mock('$app/environment', () => ({ browser: false }));
vi.mock('$env/static/public', () => ({ PUBLIC_API_URL: 'http://localhost:3000' }));

describe('SesionStore', () => {
  it('starts unauthenticated', async () => {
    const { sesion } = await import('$lib/stores/sesion.svelte');
    expect(sesion.usuario).toBeNull();
    expect(sesion.estaAutenticado).toBe(false);
    expect(sesion.cargando).toBe(false);
  });

  it('authenticates when usuario is set', async () => {
    const { sesion } = await import('$lib/stores/sesion.svelte');
    sesion.setUsuario({
      id:        '1',
      nombre:    'Test User',
      email:     'test@test.com',
      foto_url:  null,
      creado_en: '2026-01-01T00:00:00.000Z',
    });
    expect(sesion.estaAutenticado).toBe(true);
  });

  it('clears usuario on cerrarSesion', async () => {
    const { sesion } = await import('$lib/stores/sesion.svelte');
    sesion.cerrarSesion();
    expect(sesion.usuario).toBeNull();
    expect(sesion.estaAutenticado).toBe(false);
  });
});

describe('UbicacionStore', () => {
  it('starts with no location', async () => {
    const { ubicacion } = await import('$lib/stores/ubicacion.svelte');
    expect(ubicacion.tieneUbicacion).toBe(false);
    expect(ubicacion.estado).toBe('idle');
  });

  it('sets location correctly', async () => {
    const { ubicacion } = await import('$lib/stores/ubicacion.svelte');
    ubicacion.setUbicacion(-34.6037, -58.3816);
    expect(ubicacion.tieneUbicacion).toBe(true);
    expect(ubicacion.estado).toBe('ok');
  });
});

describe('NotificacionesStore', () => {
  beforeEach(async () => {
    const { notificaciones } = await import('$lib/stores/notificaciones.svelte');
    notificaciones.limpiar();
  });

  it('starts empty', async () => {
    const { notificaciones } = await import('$lib/stores/notificaciones.svelte');
    expect(notificaciones.lista).toHaveLength(0);
  });

  it('adds a notification', async () => {
    const { notificaciones } = await import('$lib/stores/notificaciones.svelte');
    notificaciones.agregar('Guardado', 'exito', 99999);
    expect(notificaciones.lista).toHaveLength(1);
    expect(notificaciones.lista[0]?.mensaje).toBe('Guardado');
  });

  it('removes a notification by id', async () => {
    const { notificaciones } = await import('$lib/stores/notificaciones.svelte');
    notificaciones.agregar('Test', 'info', 99999);
    const id = notificaciones.lista[0]?.id ?? '';
    notificaciones.eliminar(id);
    expect(notificaciones.lista).toHaveLength(0);
  });
});