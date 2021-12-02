// 工具

/**
 * @desc 防抖函数，至少间隔200毫秒执行一次
 *
 * @param {Function} fn callback
 * @param {Number} [ms=200] 默认200毫秒
 * @returns {Function}
 */
export function debounce(fn: Function, ms = 200) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

/**
 * 节流
 * @param fn 回调函数
 * @param delay 时间间隔延迟多少毫秒
 */
export function throttle<C, T extends unknown[]>(fn: (this: C, ...args: T) => void, delay = 200, immediate = false): (this: C, ...args: T) => void {
  let timer: any = null,
    remaining = 0,
    previous = Date.now();
  return function (...args: T) {
    const now = Date.now();
    remaining = now - previous;
    if (remaining >= delay || immediate) {
      if (timer) clearTimeout(timer);
      fn.call(this, ...args);
      previous = now;
      immediate = false;
    } else {
      if (timer) return;
      timer = setTimeout(() => {
        fn.call(this, ...args);
        previous = Date.now();
      }, delay - remaining);
    }
  };
}

export function rafThrottle<T extends (...args: any) => any>(fn: T): T {
  let locked = false;
  return function (this: ThisParameterType<T>, ...args: any[]) {
    if (locked) return;
    locked = true;

    window.requestAnimationFrame(() => {
      Reflect.apply(fn, this, args);
      locked = false;
    });
  } as T;
}

// 格式化文件大小 单位：Bytes、KB、MB、GB
export function formatFileSize(fileSize) {
  let temp = fileSize;
  if (fileSize < 1024) {
    return fileSize + 'B';
  } else if (fileSize < 1024 * 1024) {
    temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return Number(temp) + 'KB';
  } else if (fileSize < 1024 * 1024 * 1024) {
    temp = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return Number(temp) + 'MB';
  } else {
    temp = fileSize / (1024 * 1024 * 1024);
    temp = temp.toFixed(2);
    return Number(temp) + 'GB';
  }
}

/**
 * 多长时间之前，以天为单位
 * @param time
 * @returns
 */
export function dayAgo(time) {
  const date = new Date(time);
  const now = new Date();
  const offset = ~~((now.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
  // >5天 返回日期
  if (offset > 5) {
    let result = '';
    if (now.getFullYear() > date.getFullYear()) {
      result += date.getFullYear() + '年';
    }
    result += date.getMonth() + 1 + '月' + date.getDate() + '日';
    return result;
  } else if (offset > 0) {
    return offset + '天前';
  } else {
    return '今天';
  }
}

/**
 * 多长时间之前，以秒为单位
 * @param time
 * @returns
 */
export function timeAgo(time) {
  const date = new Date(time);
  const now = new Date();
  let text = '';
  if (now.getDate() - date.getDate() === 1) {
    text += '昨天 ';
  }

  const stamp = now.getTime() - date.getTime();
  if (stamp < 1000 * 60) {
    return '刚刚';
  } else if (stamp < 1000 * 60 * 60) {
    return ((stamp / 1000 / 60) | 0) + '分钟前';
  } else if (stamp < 1000 * 60 * 60 * 2) {
    return ((stamp / 1000 / 60 / 60) | 0) + '小时前';
  } else {
    const hour = date.getHours(),
      mins = date.getMinutes();
    if (hour < 13) {
      text += '上午' + hour + ':' + mins;
    } else {
      text += '下午' + (hour - 12) + ':' + mins;
    }
  }
  return text;
}

// 对象深度合并
export function deepMerge(obj1, obj2) {
  let key;
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
    //console.log(key)
    obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]' && obj2[key] && obj2[key].toString() === '[object Object]' ? deepMerge(obj1[key], obj2[key]) : obj2[key];
  }
  return obj1;
}
