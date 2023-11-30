import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { Menu } from '../types';

const menuClient = new ApiClient<Menu>('/menus');

function useRoutes() {
  return useQuery({
    queryKey: getEntityKey('menus'),
    queryFn: menuClient.getAll,
  });
}

export default useRoutes;
