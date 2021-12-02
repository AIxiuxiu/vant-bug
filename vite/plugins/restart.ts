import ViteRestart from 'vite-plugin-restart';

/**
 * 监听文件修改，自动重启 vite 服务
 */
export default function createRestart() {
  return ViteRestart({
    restart: [
      '.env.*',
      'vite.config.js',
      'vite/plugins/index.ts',
      'vite/plugins/auto-import.ts',
      'vite/plugins/components.ts',
      'vite/plugins/compression.ts',
      'vite/plugins/html.ts',
      'vite/plugins/restart.ts',
      'vite/plugins/svg-icon.ts'
    ]
  });
}
