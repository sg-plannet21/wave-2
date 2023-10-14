import { LoginResponse, AuthUser } from '@/entities/auth';
import storage from '@/utils/storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface LoginCredentialsDTO {
  username: string;
  password: string;
}

const baseURL = import.meta.env.VITE_API_URL;

async function login(data: LoginCredentialsDTO): Promise<AuthUser> {
  return axios
    .post<LoginResponse>(`${baseURL}/token/`, data)
    .then((res) => res.data)
    .then(({ access, refresh }) => {
      storage.accessToken.setAccessToken(access);
      storage.refreshToken.setRefreshToken(refresh);
      return jwtDecode(access) as AuthUser;
    });
}

export default login;
