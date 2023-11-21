import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import useAuth from '@/state/hooks/useAuth';
import storage from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { WaveError } from '@/entities/wave-error';
import { BusinessUnit } from '../types';
import { FormValues } from '../types/schema';

const updateBusinessUnit = new ApiClient<BusinessUnit>('/businessunits').update;

interface UpdateVariables {
  id: string;
  data: FormValues;
}

function useUpdateBusinessUnit() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  return useMutation<BusinessUnit, WaveError, UpdateVariables>({
    mutationFn: ({ id, data }) => updateBusinessUnit(id, data),
    onSuccess(newBusinessUnit) {
      queryClient.setQueryData<BusinessUnit>(
        ['business-unit', newBusinessUnit.business_unit_id],
        newBusinessUnit
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

      const isCurrentBusinessUnit =
        storage.businessUnit.getBusinessUnit().id ===
        newBusinessUnit.business_unit_id;

      const navigateCallback = isCurrentBusinessUnit
        ? () =>
            navigate(
              `/app/${encodeURIComponent(
                newBusinessUnit.business_unit
              )}/business-units`,
              { replace: true }
            )
        : undefined;

      // Update user to retrieve new Business Unit list
      refreshUser(navigateCallback);
    },
  });
}

export default useUpdateBusinessUnit;
