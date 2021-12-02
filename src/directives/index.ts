import { App } from 'vue';

interface DirectiveType {
  [key: string]: Function;
}

/**
 * 全局指令，放到modules下自动注册
 */
export default function registerDirectives(app: App<Element>) {
  // 导入 modules 下面的 所有 .ts文件
  const directives: Record<string, DirectiveType> = import.meta.globEager('./modules/*.ts');

  // 因为通过 import.meta.globEager 返回的列表不能迭代所以直接使用 Object.keys 拿到 key 遍历
  Object.keys(directives).forEach((c: string) => {
    const directive = directives[c]?.default;
    // 挂载全局控件
    directive(app);
  });
}
