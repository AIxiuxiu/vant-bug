import type { Plugin } from 'vite';
import htmlPlugin from 'vite-plugin-html';

/**
 *
 * @param env
 * @param mini
 * @returns
 */
export default function createHtml(env: any, mini: boolean) {
  const { VITE_APP_TITLE, VITE_CVONSOLE } = env;
  const html: Plugin[] = htmlPlugin({
    inject: {
      injectData: {
        title: VITE_APP_TITLE,
        vconsole: VITE_CVONSOLE
      }
    },
    minify: mini
  });
  return html;
}
