import vue from '@vitejs/plugin-vue';
import createComponents from './components';
import createCompression from './compression';
import createHtml from './html';
import createRestart from './restart';
import createSvgIcon from './svg-icon';

export default function createVitePlugins(viteEnv: any, isBuild = false) {
  const vitePlugins = [vue()];
  !isBuild && vitePlugins.push(createRestart());
  vitePlugins.push(...createHtml(viteEnv, isBuild));
  vitePlugins.push(...createComponents());
  vitePlugins.push(createSvgIcon(isBuild));
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}
