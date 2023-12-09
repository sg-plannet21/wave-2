import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { Section } from '../types';

const deleteSection = new ApiClient<Section>('/section').delete;

function useDeleteSection() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id: string) => deleteSection(id),
    onSuccess(_, sectionId) {
      queryClient.setQueryData<Section[]>(
        getEntityKey('sections'),
        (sections = []) =>
          sections.filter((section) => section.section_id !== sectionId)
      );

      addNotification({
        type: 'success',
        title: 'Section Deleted',
        duration: 5000,
      });
    },
  });
}

export default useDeleteSection;
