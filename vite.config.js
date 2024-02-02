import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import  { copy } from '@web/rollup-plugin-copy'

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
      plugins: [
        // copies the config file directly to output folder without change
        // see https://modern-web.dev/docs/building/rollup-plugin-copy/
        copy({patterns: ['TeiConverter.config.json', 'exampleCustoms.js'], rootDir:'./static'})
      ],
      // single
      output: {
        format: "umd",
        chunkFileNames: `[name].[hash].js`,
        entryFileNames: "tei-converter.umd.js",
        dir: "dist/TeiConverter",
      }
    }
  }
})
