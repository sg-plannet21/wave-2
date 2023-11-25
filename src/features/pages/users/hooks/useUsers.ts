import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { User } from '../types';

const getUsers = new ApiClient<User>('/users').getAll;

function useUsers() {
  return useQuery({
    queryKey: 'users',
    queryFn: getUsers,
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
}

export default useUsers;
