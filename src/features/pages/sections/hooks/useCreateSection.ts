import { useMutation, useQueryClient } from 'react-query';
import ApiClient from '@/services/api-client';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { FormValues } from '../types/schema';
import { Section } from '../types';

const createSection = new ApiClient<Section>('/section').create;

function useCreateSection() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: FormValues) => createSection(data),
    onSuccess(newSection) {
      queryClient.setQueryData<Section[]>(
        getEntityKey('sections'),
        (sections = []) => [newSection, ...sections]
      );
      addNotification({
        type: 'success',
        title: 'Section Created',
        message: `${newSection.section} has been created.`,
        duration: 5000,
      });
    },
  });
}

export default useCreateSection;
