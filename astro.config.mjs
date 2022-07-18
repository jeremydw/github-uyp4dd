import { defineConfig } from 'astro/config';

function litStylesVitePlugin(paths) {
  return {
    enforce: 'post',
    name: 'lit:css',
    transform(src, id) {
      id = id.split('?')[0];
      if (id.endsWith('.lit.foo')) {
        const code = 'const styles = {}; export default styles;';
        return {
          code: code,
          map: null,
        };
      }
      return undefined;
    },
  };
}

function litStylesRollupPlugin() {
  return {
    name: 'lit:css',
    resolveId(source) {
      if (source.endsWith('.lit.foo')) {
        return source;
      }
      return null;
    },
    load(id) {
      id = id.split('?')[0];
      if (id.endsWith('.lit.foo')) {
        const code = 'const styles = {}; export default styles;';
        return code;
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      modules: false,
    },
    plugins: [litStylesVitePlugin()],
  },
  build: {
    rollupOptions: {
      plugins: [litStylesRollupPlugin()],
    },
  },
});
