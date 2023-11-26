import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { WaveError } from '@/entities/wave-error';
import { getEntityKey } from '@/lib/entity-keys';
import { FormValues } from '../types/schema';
import { EntryPoint } from '../types';

const updateEntryPoint = new ApiClient<EntryPoint>('/entrypoints').update;

interface UpdateVariables {
  id: string;
  data: FormValues & Pick<EntryPoint, 'entry_point_id'>;
}

function useUpdateEntryPoint() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<EntryPoint, WaveError, UpdateVariables>({
    mutationFn: ({ id, data }) => updateEntryPoint(id, data),
    onSuccess(updatedEntryPoint) {
      queryClient.setQueryData<EntryPoint>(
        ['entry-point', updatedEntryPoint.entry_point_id],
        updatedEntryPoint
      );

      queryClient.setQueryData<EntryPoint[]>(
        getEntityKey('entry-points'),
        (entryPoints = []) =>
          entryPoints.map((entryPoint) =>
            entryPoint.entry_point_id === updatedEntryPoint.entry_point_id
              ? updatedEntryPoint
              : entryPoint
          )
      );

      addNotification({
        type: 'success',
        title: 'Entry Point Updated',
        message: `${updatedEntryPoint.entry_point} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateEntryPoint;
