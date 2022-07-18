import { defineConfig } from 'astro/config';

/**
 * Custom `.lit.scss` plugin that emits JavaScript for use with Lit elements. In
 * this example, I return an empty object but in real life, I would return a Lit
 * `unsafeCSS` object contained within a Lit `css` template tag.
 *
 * Note the resulting content should not be hoisted (like CSS modules), but rather
 * just treated as a normal custom loader.
 */
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
