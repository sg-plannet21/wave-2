import { RefreshTokenResponse } from '@/entities/auth';
import axios from 'axios';

async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  return axios.post('/refresh', { refresh: refreshToken });
}

export default refreshAccessToken;
