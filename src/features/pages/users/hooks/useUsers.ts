import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { User } from '../types';

const getUsers = new ApiClient<User>('/users').getAll;

function useUsers() {
  return useQuery({
    queryKey: getEntityKey('users'),
    queryFn: getUsers,
  });
}

export default useUsers;
