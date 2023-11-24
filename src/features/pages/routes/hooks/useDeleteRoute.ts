import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { Route } from '../types';

const deleteRoute = new ApiClient<Route>('/routes').delete;

function useDeleteRoute() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id: string) => deleteRoute(id),
    onSuccess(_, routeId) {
      queryClient.setQueryData<Route[]>(
        getEntityKey('routes'),
        (routes = []) =>
          routes.filter(
            (route) => route.route_id !== routeId
          )
      );

      addNotification({
        type: 'success',
        title: 'Route Deleted',
        duration: 5000,
      });
    },
  });
}

export default useDeleteRoute;
