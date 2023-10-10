/* eslint-disable no-param-reassign */
import axios, { InternalAxiosRequestConfig } from 'axios';
import storage from '../utils/storage';

function authInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = storage.accessToken.getAccessToken();

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
}

function businessUnitInterceptor(config: InternalAxiosRequestConfig) {
  const businessUnit = storage.businessUnit.getBusinessUnit();

  if (businessUnit) {
    config.headers.set('businessunit', businessUnit);
    // set the business unit as a POST & PUT property
    if (
      (config.method === 'POST' || config.method === 'PUT') &&
      !config.data.businessunit
    ) {
      if (!config.data) config.data = {};
      config.data.businessunit = businessUnit;
    }
  }
  return config;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(authInterceptor);
axiosInstance.interceptors.request.use(businessUnitInterceptor);
