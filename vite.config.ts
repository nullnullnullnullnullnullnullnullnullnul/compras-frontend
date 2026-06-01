import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      '$lib/components': fileURLToPath(new URL('./src/lib/components', import.meta.url)),
      '$lib/services':   fileURLToPath(new URL('./src/lib/services', import.meta.url)),
      '$lib/stores':     fileURLToPath(new URL('./src/lib/stores', import.meta.url)),
      '$lib/utils':      fileURLToPath(new URL('./src/lib/utils', import.meta.url)),
      '$lib/types':      fileURLToPath(new URL('./src/lib/types', import.meta.url)),
      '$lib/config':     fileURLToPath(new URL('./src/lib/config', import.meta.url)),
      '$lib':            fileURLToPath(new URL('./src/lib', import.meta.url)),
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.test.ts']
  }
});