import { ComponentCustomProperties, ComponentInternalInstance, getCurrentInstance } from 'vue';

/**
 * 全局变量 globalProperties
 */
export default function useCurrentInstance() {
  // ctx 只是为了便于在开发模式下通过控制台检查，在 prod 模式是一个空对象
  const { appContext, proxy }: { appContext; proxy: any } = getCurrentInstance() as ComponentInternalInstance;
  const globalProperties = appContext.config.globalProperties as ComponentCustomProperties;
  return {
    proxy: proxy || {}, //尽量不要使用proxy
    globalProperties,
    $dayjs: globalProperties.$dayjs,
    $sa: globalProperties.$sa,
    $const: globalProperties.$const
  };
}
