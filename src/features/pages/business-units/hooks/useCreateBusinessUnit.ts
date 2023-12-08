import { useMutation, useQueryClient } from 'react-query';
import ApiClient from '@/services/api-client';
import { useNotificationStore } from '@/state/notifications';
import useAuth from '@/state/hooks/useAuth';
import { FormValues } from '../types/schema';
import { BusinessUnit } from '../types';

const createBusinessUnit = new ApiClient<BusinessUnit>('/businessunits').create;

function useCreateBusinessUnit() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: (data: FormValues) => createBusinessUnit(data),
    onSuccess(newBusinessUnit) {
      queryClient.setQueryData<BusinessUnit[]>(
        'business-units',
        (businessUnits = []) => [newBusinessUnit, ...businessUnits]
      );
      addNotification({
        type: 'success',
        title: 'Business Unit Created',
        message: `${newBusinessUnit.business_unit} has been created.`,
        duration: 5000,
      });

      // Update user to retrieve new Business Unit list
      refreshUser();
    },
  });
}

export default useCreateBusinessUnit;
