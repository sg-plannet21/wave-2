/* eslint-disable no-param-reassign */
import refreshAccessToken from '@/features/auth/api/refreshToken';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import storage from '../utils/storage';

function authInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = storage.accessToken.getAccessToken();

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
}

function businessUnitInterceptor(config: InternalAxiosRequestConfig) {
  const businessUnit = storage.businessUnit.getBusinessUnit().id;

  config.headers.businessunit = businessUnit;

  // set the business unit as a POST & PUT property
  if (
    (config.method === 'POST' || config.method === 'PUT') &&
    !config.data.businessunit
  ) {
    if (!config.data) config.data = {};
    config.data.businessunit = businessUnit;
  }
  return config;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

axiosInstance.interceptors.request.use(authInterceptor);
axiosInstance.interceptors.request.use(businessUnitInterceptor);
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error): Promise<void | AxiosResponse> => {
    // eslint-disable-next-line no-console
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest.retry) {
      // eslint-disable-next-line no-console
      console.log('Token has expired, refreshing....');
      originalRequest.retry = true;
      try {
        const { access } = await refreshAccessToken(
          storage.refreshToken.getRefreshToken()
        );
        storage.accessToken.setAccessToken(access);
        return await axiosInstance(originalRequest);
      } catch {
        // eslint-disable-next-line no-alert
        alert('token has expired');
        window.location.assign('/logout');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
