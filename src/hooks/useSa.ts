import { ComponentCustomProperties, ComponentInternalInstance, getCurrentInstance } from 'vue';

/**
 * 使用神策统计
 */
export default function useSa() {
  console.error(getCurrentInstance());

  const { appContext, proxy } = getCurrentInstance() as ComponentInternalInstance;
  const globalProperties = appContext.config.globalProperties as ComponentCustomProperties;
  return globalProperties.$sa;
}
