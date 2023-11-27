import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { EntryPoint } from '../types';

const unassignEntryPoint = new ApiClient<EntryPoint>('/entrypoints').delete;

function useUnassignEntryPoint() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id: string) => unassignEntryPoint(id),
    onSuccess(_, routeId) {
      queryClient.setQueryData<EntryPoint[]>(
        getEntityKey('entry-points'),
        (entryPoints = []) =>
          entryPoints.filter((route) => route.entry_point_id !== routeId)
      );

      addNotification({
        type: 'success',
        title: 'Entry Point Deleted',
        duration: 5000,
      });
    },
  });
}

export default useUnassignEntryPoint;
