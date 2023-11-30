import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Menu } from '../types';

const menuClient = new ApiClient<Menu>('/menus');

function useMenu(id: string) {
  return useQuery({
    queryKey: ['menu', id],
    queryFn: () => menuClient.get(id),
    enabled: !!id,
  });
}

export default useMenu;
