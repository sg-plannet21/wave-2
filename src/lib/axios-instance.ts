/* eslint-disable no-param-reassign */
import refreshAccessToken from '@/features/auth/api/refreshToken';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { WaveError } from '@/entities/wave-error';
import { useNotificationStore } from '@/state/notifications';
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
    if (axios.isAxiosError(error)) {
      const errors = error.response?.data.errors as
        | WaveError['errors']
        | undefined;

      const originalRequest = error.config as InternalAxiosRequestConfig & {
        waveRetry?: boolean;
      };
      const isExpiredToken =
        error.response?.status === 403 &&
        !originalRequest.waveRetry &&
        errors &&
        errors.some((err) => err.detail.indexOf('token not valid') !== -1);

      if (isExpiredToken) {
        originalRequest.waveRetry = true;

        useNotificationStore.getState().addNotification({
          title: 'Token Expired',
          message: 'Refreshng Token',
          type: 'info',
          duration: 5000,
        });

        try {
          const { access } = await refreshAccessToken(
            storage.refreshToken.getRefreshToken()
          );
          storage.accessToken.setAccessToken(access);
          return await axiosInstance(originalRequest);
        } catch {
          useNotificationStore.getState().addNotification({
            title: 'Token Expired',
            message: 'Login Required',
            type: 'warning',
            duration: 10000,
          });
          window.location.assign('/logout');
        }
      }
      if (errors) {
        errors.forEach((err) => {
          useNotificationStore.getState().addNotification({
            title: 'Error',
            message: err.detail || error.message,
            type: 'error',
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
