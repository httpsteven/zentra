import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const page = (name) => fileURLToPath(new URL(`./${name}`, import.meta.url));

// Multi-page static site. Each HTML file is its own entry point so
// `vite build` emits one optimized page per route.
export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: page('index.html'),
        about: page('about.html'),
        services: page('services.html'),
        faq: page('faq.html'),
        contact: page('contact.html'),
      },
    },
  },
});
