import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { WaveError } from '@/entities/wave-error';
import { FormValues } from '../types/schema';
import { Route } from '../types';

const updateRoute = new ApiClient<Route>('/routes').update;

interface UpdateVariables {
  id: string;
  data: FormValues;
}

function useUpdateRoute() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<Route, WaveError, UpdateVariables>({
    mutationFn: ({ id, data }) => updateRoute(id, data),
    onSuccess(newRoute) {
      queryClient.setQueryData<Route>(['route', newRoute.route_id], newRoute);

      queryClient.setQueryData<Route[]>(['routes'], (routes = []) =>
        routes.map((route) =>
          route.route_id === newRoute.route_id ? newRoute : route
        )
      );
            
      addNotification({
        type: 'success',
        title: 'Business Unit Updated',
        message: `${newRoute.business_unit} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateRoute;
