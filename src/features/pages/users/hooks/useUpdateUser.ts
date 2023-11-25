import { useNotificationStore } from '@/state/notifications';
import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { WaveError } from '@/entities/wave-error';
import { User } from '../types';

const updateUser = new ApiClient<User>('/users').update;

interface UpdateVariables {
  id: number;
  roles: Array<number>;
}

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<User, WaveError, UpdateVariables>({
    mutationFn: ({ id, roles }) =>
      updateUser(String(id), {
        business_unit_roles: roles,
      }),

    onSuccess(_, updateVariables) {
      queryClient.setQueryData<User[]>('users', (users = []) =>
        users.map((user) =>
          user.id === updateVariables.id
            ? { ...user, business_unit_roles: updateVariables.roles }
            : user
        )
      );

      addNotification({
        type: 'success',
        title: 'User Role Updated',
        duration: 3000,
      });
    },
  });
}

export default useUpdateUser;
