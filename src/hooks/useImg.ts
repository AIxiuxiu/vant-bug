const imgModules = import.meta.globEager('../assets/images/*');

/**
 * 使用图片
 * @param name 图片名称
 */
export default function useImage(name: string) {
  const imgPath = `../assets/images/${name}`;
  return imgModules[imgPath].default;
}
