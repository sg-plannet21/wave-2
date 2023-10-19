import axiosInstance from '@/lib/axios-instance';
import continousFetcher from '@/lib/continous-fetcher';

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (id: string) => axiosInstance.get<T>(`${this.endpoint}/${id}/`);

  getAll = () => continousFetcher<T>(this.endpoint).then((res) => res.data);
}

export default ApiClient;
