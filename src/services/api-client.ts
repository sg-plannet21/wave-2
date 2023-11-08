import axiosInstance from '@/lib/axios-instance';
import continousFetcher from '@/lib/continous-fetcher';

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (id: string): Promise<T> =>
    axiosInstance.get<T>(`${this.endpoint}/${id}/`).then((res) => res.data);

  getAll = (): Promise<T[]> =>
    continousFetcher<T>(this.endpoint).then((res) => res.data);

  delete = (id: string): Promise<null> =>
    axiosInstance
      .delete<null>(`${this.endpoint}/${id}/`)
      .then((res) => res.data);
}

export default ApiClient;
