import { LoginResponse } from '@/entities/auth';
import axios from 'axios';

interface LoginCredentialsDTO {
  username: string;
  password: string;
}

async function login(data: LoginCredentialsDTO): Promise<LoginResponse> {
  return axios.post('/login', data);
}

export default login;
