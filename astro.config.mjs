import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Se till att INGEN rad här uppe importerar '@tailwindcss/vite'
export default defineConfig({
  integrations: [tailwind()],
  base: '/LORA.github.io', // Lägg till denna rad!
});