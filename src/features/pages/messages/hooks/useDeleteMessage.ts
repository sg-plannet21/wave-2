import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { Prompt } from '../types';

const deleteMessage = new ApiClient<Prompt>('/prompts').delete;

function useDeleteMessage() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess(_, messageId) {
      queryClient.setQueryData<Prompt[]>(
        getEntityKey('messages'),
        (messages = []) =>
          messages.filter((message) => message.prompt_id !== Number(messageId))
      );

      addNotification({
        type: 'success',
        title: 'Message Deleted',
        duration: 5000,
      });
    },
  });
}

export default useDeleteMessage;
