import { AxiosResponse } from 'axios';
import { ApiCollectionResponse } from '@/entities/api-collection-response';
import axiosInstance from './axios-instance';

function replaceHttps(url: string): string {
  return url.replace(/^https:\/\//i, 'http://');
}

async function continousFetcher<T>(url: string): Promise<{ data: T[] }> {
  const results: T[] = [];
  const page = 1;
  let nextUrl: string | null = `${url}?page=${page}`;

  while (nextUrl) {
    // eslint-disable-next-line no-await-in-loop
    const { data } = (await axiosInstance.get(nextUrl)) as AxiosResponse<
      ApiCollectionResponse<T>
    >;

    results.push(...data.results);

    if (data.next) {
      nextUrl = import.meta.env.DEV ? replaceHttps(data.next) : data.next;
    } else {
      nextUrl = null;
    }
  }
  return { data: [...results] };
}

export default continousFetcher;
