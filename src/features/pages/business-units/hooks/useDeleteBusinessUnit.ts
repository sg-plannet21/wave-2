import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { BusinessUnit } from '../types';

const deleteBusinessUnit = new ApiClient<BusinessUnit>('/businessunits').delete;

function useDeleteBusinessUnit() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id: string) => deleteBusinessUnit(id),
    onSuccess(_, businessUnitId) {
      queryClient.setQueryData<BusinessUnit[]>(
        ['business-units'],
        (businessUnits = []) =>
          businessUnits.filter(
            (businessUnit) => businessUnit.business_unit_id !== businessUnitId
          )
      );

      addNotification({
        type: 'success',
        title: 'Business Unit Deleted',
        duration: 5000,
      });
    },
  });
}

export default useDeleteBusinessUnit;
