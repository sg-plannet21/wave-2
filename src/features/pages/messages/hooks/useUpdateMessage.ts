import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { WaveError } from '@/entities/wave-error';
import { getEntityKey } from '@/lib/entity-keys';
import { Prompt } from '../types';

const updateMessage = new ApiClient<Prompt>('/prompts').update;

type UpdateVariables = Pick<
  Prompt,
  'prompt_id' | 'prompt_name' | 'prompt_detail'
>;

function useUpdateMessage() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<Prompt, WaveError, UpdateVariables>({
    mutationFn: (data) => updateMessage(String(data.prompt_id), data),
    onSuccess(newMessage) {
      queryClient.setQueryData<Prompt>(
        ['message', newMessage.prompt_id],
        newMessage
      );

      queryClient.setQueryData<Prompt[]>(
        getEntityKey('messages'),
        (messages = []) =>
          messages.map((message) =>
            message.prompt_id === newMessage.prompt_id ? newMessage : message
          )
      );
      addNotification({
        type: 'success',
        title: 'Message Updated',
        message: `${newMessage.prompt_name} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateMessage;
