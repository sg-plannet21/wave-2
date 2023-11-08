import { RefreshTokenResponse } from '@/entities/auth';
import storage from '@/utils/storage';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

async function refreshAccessToken(): Promise<RefreshTokenResponse> {
  return axios
    .post(`${baseURL}/token/refresh/`, {
      refresh: storage.refreshToken.getRefreshToken(),
    })
    .then((res) => res.data)
    .then((res) => {
      storage.accessToken.setAccessToken(res.access);
      return res;
    });
}

export default refreshAccessToken;
