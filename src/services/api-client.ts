// TODO: update to axiosInstance
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

class ApiClient<T> {
  endpoint: string;

  /**
   *
   */
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (id: string) =>
    axios.get<T>(`${baseUrl}${this.endpoint}/${id}`).then((res) => res.data);

  getAll = () =>
    axios.get<T[]>(`${baseUrl}${this.endpoint}/`).then((res) => res.data);
}

export default ApiClient;
