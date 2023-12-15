import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    // this tells the compiler that we are exporting a custom element
    compilerOptions: {
      customElement: true,
    }
  })],
  // build options that take main.js as input and bundle everything into a single output file in UMD format
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        index: "./src/main.js",
      },
      // single
      output: {
        format: "umd",
        chunkFileNames: `[name].[hash].js`,
        entryFileNames: "tei-converter.umd.js",
        dir: "dist",
      },
    }
  }
})
