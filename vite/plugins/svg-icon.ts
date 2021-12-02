import path from 'path';
import svgIcon from 'vite-plugin-svg-icons';

/**
 * 生成 svg 雪碧图
 * @param compress 是否压缩
 */
export default function createSvgIcon(compress: boolean) {
  return svgIcon({
    iconDirs: [path.resolve(process.cwd(), 'src/render/assets/icons/')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: compress
  });
}
