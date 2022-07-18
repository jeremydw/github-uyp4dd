import { defineConfig } from 'astro/config';

function litStylesVitePlugin(paths) {
  return {
    enforce: 'post',
    name: 'lit:css',
    transform(src, id) {
      id = id.split('?')[0];
      if (id.endsWith('.lit.scss')) {
        const code = `const styles = {}; export default styles;`;
        return {
          code: code,
          map: null,
        };
      }
      return undefined;
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
});
