import { AxiosResponse } from 'axios';
import { ApiCollectionResponse } from '@/entities/api-collection-response';
import axiosInstance from './axios-instance';

async function continousFetcher<T>(url: string) {
  const results = [];
  let page = 1;
  let nextUrl: string | null = `${url}?page=${page}`;
  while (nextUrl) {
    // eslint-disable-next-line no-await-in-loop
    const { data } = (await axiosInstance.get(nextUrl)) as AxiosResponse<
      ApiCollectionResponse<T>
    >;
    results.push(...data.results);
    if (data.next) {
      nextUrl = import.meta.env.DEV ? `${url}?page=${page++}` : data.next;
    } else {
      nextUrl = null;
    }
  }
  return { data: [...results] };
}

export default continousFetcher;
