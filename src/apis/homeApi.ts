import { get, post } from './request';

export type BannerResponse = { img: string }[];
export type CategoryResponse = { icon: string; name: string }[];
export type ListRequest = { pageSize: number; pageNo: number };
export type ListResponse = {
  desc: string;
  img: string;
  oldPrice: number;
  price: number;
  productId: string;
  title: string;
}[];

export class HomeApi {
  getBanner() {
    return get<BannerResponse>('/home/banner');
  }

  getCategory() {
    return get<CategoryResponse>('/home/category');
  }

  getList(data: ListRequest) {
    return post<ListResponse>('/home/list', data);
  }
}
