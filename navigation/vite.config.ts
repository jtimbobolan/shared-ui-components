import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    })
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'cw-navigation.ts'),
      name: 'CwNavigation',
      formats: ['es', 'umd'],
      fileName: (format) => `cw-navigation.${format}.js`
    },
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      external: [],
      output: {
        exports: 'named'
      }
    }
  }
});
