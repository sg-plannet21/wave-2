import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { WaveError } from '@/entities/wave-error';
import { getEntityKey } from '@/lib/entity-keys';
import { FormValues } from '../types/schema';
import { Menu } from '../types';

const updateMenu = new ApiClient<Menu>('/menus').update;

interface UpdateVariables {
  id: string;
  data: FormValues & Pick<Menu, 'menu_id'>;
}

function useUpdateMenu() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<Menu, WaveError, UpdateVariables>({
    mutationFn: ({ id, data }) => updateMenu(id, data),
    onSuccess(updatedMenu) {
      queryClient.setQueryData<Menu>(
        ['menu', updatedMenu.menu_id],
        updatedMenu
      );

      queryClient.setQueryData<Menu[]>(getEntityKey('menus'), (menus = []) =>
        menus.map((menu) =>
          menu.menu_id === updatedMenu.menu_id ? updatedMenu : menu
        )
      );

      addNotification({
        type: 'success',
        title: 'Menu Updated',
        message: `${updatedMenu.menu_name} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateMenu;
