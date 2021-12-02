import { VantResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import styleImport, { VantResolve } from 'vite-plugin-style-import';

/**
 * 组件自动按需导入
 */
export default function createComponents() {
  return [
    Components({
      dts: true,
      dirs: ['components'],
      resolvers: [VantResolver()]
    }),
    styleImport({
      resolves: [VantResolve()]
    })
  ];
}
