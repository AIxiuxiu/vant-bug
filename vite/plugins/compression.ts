import compression from 'vite-plugin-compression';

/**
 * 使用 gzip 或者 brotli 来压缩资源
 */
export default function createCompression(env: any) {
  const { VITE_BUILD_COMPRESS } = env;
  const compressList = VITE_BUILD_COMPRESS.split(',');
  const plugin = [];
  if (compressList.includes('gzip')) {
    plugin.push(
      compression({
        ext: '.gz',
        deleteOriginFile: false
      })
    );
  }
  if (compressList.includes('brotli')) {
    plugin.push(
      compression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: false
      })
    );
  }
  return plugin;
}
