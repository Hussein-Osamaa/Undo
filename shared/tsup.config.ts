import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'firebase'],
  treeshake: true,
  minify: true,
  target: 'es2020',
  outDir: 'dist',
  esbuildOptions(options) {
    options.jsx = 'react-jsx';
  },
});
