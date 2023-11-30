import { useMutation, useQueryClient } from 'react-query';
import ApiClient from '@/services/api-client';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { FormValues } from '../types/schema';
import { Menu } from '../types';

const createMenu = new ApiClient<Menu>('/menus').create;

function useCreateMenu() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: FormValues) => createMenu(data),
    onSuccess(newMenu) {
      queryClient.setQueryData<Menu[]>(getEntityKey('menus'), (menus = []) => [
        newMenu,
        ...menus,
      ]);
      addNotification({
        type: 'success',
        title: 'Menu Created',
        message: `${newMenu.menu_name} has been created.`,
        duration: 5000,
      });
    },
  });
}

export default useCreateMenu;
