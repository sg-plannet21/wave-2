import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { Menu } from '../types';

const deleteMenu = new ApiClient<Menu>('/menus').delete;

function useDeleteMenu() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id: string) => deleteMenu(id),
    onSuccess(_, menuId) {
      queryClient.setQueryData<Menu[]>(getEntityKey('menus'), (menus = []) =>
        menus.filter((menu) => menu.menu_id !== menuId)
      );

      addNotification({
        type: 'success',
        title: 'Menu Deleted',
        duration: 5000,
      });
    },
  });
}

export default useDeleteMenu;
