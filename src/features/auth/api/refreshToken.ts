import { AuthUser } from '@/entities/auth';
import storage from '@/utils/storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const baseURL = import.meta.env.VITE_API_URL;

async function refreshAccessToken(): Promise<AuthUser> {
  return axios
    .post(`${baseURL}/token/refresh/`, {
      refresh: storage.refreshToken.getRefreshToken(),
    })
    .then((res) => res.data)
    .then((res) => {
      storage.accessToken.setAccessToken(res.access);
      return jwtDecode(res.access) as AuthUser;
    });
}

export default refreshAccessToken;
