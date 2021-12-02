import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Dialog, Toast } from 'vant';
import { storage } from '../utils/storage';

const baseURL = import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL?.toString();

const http: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token: string = storage.get('token');
    config.headers.token = token;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    if (response.status === 200 && response.data) {
      // 未设置状态码则默认成功状态
      const code = response.data.code || 0;
      if (code == 0) {
        return Promise.resolve(response.data);
      } else if (code == 403) {
        Dialog.alert({
          title: '提示',
          message: '您还未登录或登录已过期，请重新登录'
        }).then(() => {
          location.href = process.env.VUE_APP_PUBLIC_PATH + '/login';
        });
        return Promise.reject(response);
      } else if (response.data && response.data.message && response.data.message != '') {
        Toast(response.data.message);
        return Promise.resolve(response.data);
      }
    } else {
      return Promise.reject(response);
    }
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error('网络请求地址不存在！');
          break;
        case 405:
          console.error('请求方式错误，请确认是GET还是POST');
          break;
        case 500:
          console.error('服务器错误！');
          break;
        default:
          console.error(error.response.status, error.message);
          break;
      }
    }
    return Promise.reject(error);
  }
);

export interface QjResponse<T = any> {
  [x: string]: any;
  code?: number;
  msg?: string;
  total?: number;
  data?: T;
}

interface Get {
  <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<QjResponse<T>>;
}

interface Post {
  <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<QjResponse<T>>;
}

interface Upload {
  <T>(url: string, formData?: object, config?: AxiosRequestConfig): Promise<QjResponse<T>>;
}

/**
 * 封装get方法
 * @param url url
 * @param params 参数
 * @param config 配置
 * @returns {Promise}
 */
export const get: Get = async (url, params, config) => http.get(url, { params, ...config });

/**
 * 封装post请求
 * @param url url
 * @param data  参数
 * @param config 配置
 * @returns {Promise}
 */
export const post: Post = async (url, data, config) => http.post(url, data, config);

/**
 * 封装上传文件
 * @param url 地址
 * @param formData formData
 * @param config 配置
 * @returns {Promise}
 */
export const upload: Upload = async (url, formData, config) => {
  config = Object.assign(config, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return http.post(url, formData, config);
};

export default http;
