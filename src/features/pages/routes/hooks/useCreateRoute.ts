import { useMutation, useQueryClient } from 'react-query';
import ApiClient from '@/services/api-client';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { FormValues } from '../types/schema';
import { Route } from '../types';

const createRoute = new ApiClient<Route>('/routes').create;

function useCreateRoute() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: FormValues) => createRoute(data),
    onSuccess(newRoute) {
      queryClient.setQueryData<Route[]>(
        getEntityKey('routes'),
        (routes = []) => [newRoute, ...routes]
      );
      addNotification({
        type: 'success',
        title: 'Route Created',
        message: `${newRoute.route_name} has been created.`,
        duration: 5000,
      });
    },
  });
}

export default useCreateRoute;
