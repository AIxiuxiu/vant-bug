import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import createVitePlugins from './vite/plugins';

// https://vitejs.dev/config/
export default ({ mode, command }: any) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: './',
    assetsInclude: path.resolve(__dirname, 'src/assets/images'),
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      port: +env.VITE_SERVER_PORT,
      open: false,
      proxy: {
        '/proxy': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY == 'true',
          rewrite: (path) => path.replace(/\/proxy/, '')
        }
      }
    },
    // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
    build: {
      outDir: path.resolve(__dirname, `${env.VITE_BUILD_OUTDIR}`),
      sourcemap: env.VITE_BUILD_SOURCEMAP == 'true',
      emptyOutDir: true,
      terserOptions: {
        compress: {
          drop_console: env.VITE_BUILD_DROP_CONSOLE == 'true'
        }
      }
    },
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `@import "@/styles/variables.scss"; @import "@/styles/utils.scss";`
        }
      }
    }
  });
};
