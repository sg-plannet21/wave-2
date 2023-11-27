import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { WaveError } from '@/entities/wave-error';
import { useNotificationStore } from '@/state/notifications';
import storage from '@/utils/storage';
import { EntryPoint } from '../../entry-points/types';
import useBusinessUnit from '../../business-units/hooks/useBusinessUnit';

interface UpdateVariables {
  id: string;
  entry_point: string;
}

const apiClient = new ApiClient<EntryPoint>('/entrypoints');

function useAssignEntryPoint() {
  const currentBusinessUnit = storage.businessUnit.getBusinessUnit();
  const { data: businessUnit } = useBusinessUnit(currentBusinessUnit.id);
  const { addNotification } = useNotificationStore();
  const queryClient = useQueryClient();

  return useMutation<EntryPoint, WaveError, UpdateVariables>({
    mutationFn: (data) =>
      apiClient.update(`${data.id}/?unassigned=true`, {
        entry_point_id: data.id,
        entry_point: data.entry_point,
        businesss_unit: currentBusinessUnit.id,
        region: businessUnit?.default_region,
      }),
    onSuccess(data) {
      queryClient.setQueryData<EntryPoint[]>(
        'unassigned-entry-points',
        (entryPoints = []) =>
          entryPoints.filter(
            (entryPoint) => entryPoint.entry_point_id !== data.entry_point_id
          )
      );

      addNotification({
        type: 'success',
        title: 'Entry Point Updated',
        message: `${data.entry_point} has been assigned to ${currentBusinessUnit.label} business unit.`,
        duration: 5000,
      });
    },
  });
}

export default useAssignEntryPoint;
