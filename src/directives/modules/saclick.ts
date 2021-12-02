import { App } from 'vue';

/**
 * 指令：v-saclick
 * 使用示例：v-saclick="{clickName:'XXX',clickData:{params1:'XXX',params2:'XX'}}"
 * clickName：埋点函数名
 * clickData | Object  params当前埋点函数所需参数
 */
export default function (app: App<Element>) {
  app.directive('saclick', {
    mounted: (el, binding, a) => {
      el.addEventListener('click', () => {
        const clickName = binding.value.clickName; // 携带的数据
        const data = binding.value.clickData || {}; //接收传参
        app.config.globalProperties.$sa.track(clickName, data);
      });
    }
  });
}
