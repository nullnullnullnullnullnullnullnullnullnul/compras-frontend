import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // usuario is already hydrated by hooks.server.ts
  // just expose it to the client
  return {
    usuario: locals.usuario,
  };
};