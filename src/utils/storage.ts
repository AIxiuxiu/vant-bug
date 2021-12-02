/**
 * 封装操作localstorage本地存储的方法
 */
export const storage = {
  //存储
  set(key: string, value: any) {
    if (!key) return;
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  //取出数据
  get<T>(key: string) {
    const value = localStorage.getItem(key);
    if (value && value != 'undefined' && value != 'null') {
      return <T>JSON.parse(value);
    }
  },
  // 删除数据
  remove(key: string) {
    if (!key) return;
    localStorage.removeItem(key);
  }
};

/**
 * 封装操作sessionStorage本地存储的方法
 */
export const sessionStorage = {
  //存储
  set(key: string, value: any) {
    if (!key) return;
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    sessionStorage.set(key, value);
  },
  //取出数据
  get<T>(key: string) {
    const value = sessionStorage.get(key);
    if (value && value != 'undefined' && value != 'null') {
      return <T>JSON.parse(value);
    }
  },
  // 删除数据
  remove(key: string) {
    if (!key) return;
    sessionStorage.remove(key);
  }
};
