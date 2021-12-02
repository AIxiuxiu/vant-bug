import { QjResponse } from '@/apis/request';
import { InjectTabkeKey } from '@/types/symbols';
import { noop, promiseTimeout } from '@vueuse/shared';
import { provide, ref, shallowRef } from 'vue';

export interface AsyncApiOptions<R> {
  /**
   * 默认值， 可配合 resetOnExecute使用
   */
  initialData?: R;
  /**
   * 延迟执行
   * @default 0
   */
  delay?: number;
  /**
   * 函数被调用后立即执行, 当设置为 false 时，您将需要手动执行它 refresh()
   * @default true
   */
  immediate?: boolean;

  /**
   * 执行承诺之前将返回值data设置为 initialState
   * @default true
   */
  resetOnExecute?: boolean;
  /**
   * 当返回结果为空时，更新为初始值 initialData
   * @default true
   */
  nodataReset?: boolean;
  /**
   * 赋值回调
   */
  onFilter?: (e: R) => R;
  /**
   * 成功回调
   */
  onSuccess?: (e: R) => void;
  /**
   * 错误回调
   */
  onError?: (e: unknown) => void;
}

/**
 * 使用异步Api请求
 * @param promise 接口方法
 * @param options AsyncApiOptions
 * @returns
 */
export function useAsyncApi<R, Args extends any = any>(apiFun: (args: Args) => Promise<QjResponse<R>>, options?: AsyncApiOptions<R>) {
  const { immediate = true, delay = 0, onError = noop, onSuccess = noop, resetOnExecute = false, nodataReset = true, initialData, onFilter } = options || {};

  const total = ref(0);
  const data = shallowRef(initialData);
  const isNoData = ref(false);
  const isLoading = ref(false);
  const isReady = ref(false);
  const error = ref<unknown | undefined>(undefined);

  async function refresh(newParams?: any) {
    if (resetOnExecute) data.value = initialData;
    error.value = undefined;
    isReady.value = false;
    isLoading.value = true;
    isNoData.value = false;
    if (delay > 0) await promiseTimeout(delay);

    try {
      let result = await apiFun(newParams);
      if (!result || !result.data) {
        isNoData.value = true;
        if (nodataReset) {
          result = { ...result, data: initialData };
        }
      }
      if (onFilter) {
        result.data = onFilter(result.data);
      }
      data.value = result.data;
      total.value = result.total;
      isReady.value = true;
      onSuccess(result.data);
    } catch (e) {
      console.error(e);
      error.value = e;
      onError(e);
    }
    isLoading.value = false;
  }

  if (immediate) refresh();

  return {
    // 总数，列表时使用
    total,
    // 返回值
    data,
    isLoading,
    isReady,
    isNoData,
    error,
    refresh
  };
}

export interface AsyncTableApiOptions<R> extends AsyncApiOptions<R> {
  /**
   * id, 用于区分不同的列表
   */
  id?: string;
  /**
   * 每页数量pageSize, 默认是10
   */
  pageSize?: number;
  /**
   * pageSize的 prop, 接口对应的每页数量key 默认 pagesize
   */
  pageSizeProp?: string;
  /**
   * currentPage的 prop, 接口对应的页码key 默认 page
   */
  currentPageProp?: string;
}

export function useAsyncTableApi<R, Args extends any = any>(apiFun: (args: Args) => Promise<QjResponse<R>>, options?: AsyncTableApiOptions<R>) {
  const { id = '', immediate = true, pageSize = 10, pageSizeProp = 'pagesize', currentPageProp = 'page' } = (options = options || {});
  const oldImmediate = immediate;
  if (immediate) {
    options.immediate = false;
  }
  // 页码重置
  let pageInitFlag = true;
  const oldOnSuccess = options.onSuccess;
  options.onSuccess = (e) => {
    pageInitFlag = false;
    oldOnSuccess && oldOnSuccess(e);
  };
  const asyncApi = useAsyncApi(apiFun, options);

  const pageSizeRef = ref(pageSize);
  const currentPage = ref(1);
  const oldRefresh = asyncApi.refresh;
  let tempParams;
  const newRefresh = (pageFlag?: boolean) => {
    pageInitFlag = pageFlag;
    if (pageInitFlag) {
      currentPage.value = 1;
    }
    return oldRefresh(Object.assign(tempParams || {}, { [currentPageProp]: currentPage.value, [pageSizeProp]: pageSizeRef.value }));
  };

  const onCurrentChange = () => {
    // 兼容无数据，页码改变重复请求
    if (pageInitFlag || asyncApi.total.value == 0) {
      return;
    }
    newRefresh();
  };
  const onSizeChange = () => {
    newRefresh(true);
  };
  // 覆写 refresh方法，合并page参数
  asyncApi.refresh = (newParams?: any) => {
    let pageInitFlag = true;
    if (newParams && Object.prototype.hasOwnProperty.call(newParams, 'pageInitFlag')) {
      pageInitFlag = newParams.pageInitFlag;
      delete newParams.pageInitFlag;
    }
    tempParams = newParams;
    return newRefresh(pageInitFlag);
  };
  // 判断是否立即执行
  oldImmediate && asyncApi.refresh();

  provide(InjectTabkeKey(id), { pageSize: pageSizeRef, currentPage, onCurrentChange, onSizeChange, totalCount: asyncApi.total, refresh: asyncApi.refresh });

  return { ...asyncApi, pageSize: pageSizeRef, currentPage };
}

export type UseAsyncApiReturn = ReturnType<typeof useAsyncApi>;
