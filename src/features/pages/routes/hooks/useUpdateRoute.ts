import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { WaveError } from '@/entities/wave-error';
import { getEntityKey } from '@/lib/entity-keys';
import { FormValues } from '../types/schema';
import { Route } from '../types';

const updateRoute = new ApiClient<Route>('/routes').update;

interface UpdateVariables {
  id: string;
  data: FormValues & Pick<Route, 'route_id'>;
}

function useUpdateRoute() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<Route, WaveError, UpdateVariables>({
    mutationFn: ({ id, data }) => updateRoute(id, data),
    onSuccess(updatedRoute) {
      queryClient.setQueryData<Route>(
        ['route', updatedRoute.route_id],
        updatedRoute
      );

      queryClient.setQueryData<Route[]>(getEntityKey('routes'), (routes = []) =>
        routes.map((route) =>
          route.route_id === updatedRoute.route_id ? updatedRoute : route
        )
      );

      addNotification({
        type: 'success',
        title: 'Route Updated',
        message: `${updatedRoute.route_name} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateRoute;
