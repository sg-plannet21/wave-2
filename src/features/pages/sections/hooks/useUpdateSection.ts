import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { WaveError } from '@/entities/wave-error';
import { getEntityKey } from '@/lib/entity-keys';
import { Section } from '../types';
import { FormValues } from '../types/schema';

const updateSection = new ApiClient<Section>('/section').update;

interface UpdateVariables {
  id: string;
  data: FormValues & Pick<Section, 'section_id'>;
}

function useUpdateSection() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<Section, WaveError, UpdateVariables>({
    mutationFn: ({ id, data }) => updateSection(id, data),
    onSuccess(newSection) {
      queryClient.setQueryData<Section>(
        ['section', newSection.section_id],
        newSection
      );

      queryClient.setQueryData<Section[]>(
        getEntityKey('sections'),
        (sections = []) =>
          sections.map((section) =>
            section.section_id === newSection.section_id ? newSection : section
          )
      );
      addNotification({
        type: 'success',
        title: 'Section Updated',
        message: `${newSection.section} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateSection;
