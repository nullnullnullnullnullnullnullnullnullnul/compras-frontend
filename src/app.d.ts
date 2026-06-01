import type { Usuario } from '$lib/types';

declare global {
  namespace App {
    interface Locals {
      usuario: Usuario | null;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface PageData {}
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Error {}
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Platform {}
  }
}

export {};