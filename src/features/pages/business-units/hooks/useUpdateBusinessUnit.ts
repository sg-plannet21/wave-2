import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { BusinessUnit } from '../types';
import { FormValues } from '../types/schema';

const updateBusinessUnit = new ApiClient<BusinessUnit>('/businessunits').update;

function useUpdateBusinessUnit(id: string) {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: FormValues) => updateBusinessUnit(id, data),
    onSuccess(newBusinessUnit) {
      queryClient.setQueryData<BusinessUnit>(
        ['business-units', id],
        () => newBusinessUnit
      );

      queryClient.setQueryData<BusinessUnit[]>(
        ['business-units'],
        (businessUnits = []) =>
          businessUnits.map((businessUnit) =>
            businessUnit.business_unit_id === newBusinessUnit.business_unit_id
              ? newBusinessUnit
              : businessUnit
          )
      );
      addNotification({
        type: 'success',
        title: 'Business Unit Updated',
        message: `${newBusinessUnit.business_unit} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateBusinessUnit;
