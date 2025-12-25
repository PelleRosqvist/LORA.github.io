import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://PelleRosqvist.github.io',
  base: '/LORA.github.io',
  integrations: [tailwind()],
});