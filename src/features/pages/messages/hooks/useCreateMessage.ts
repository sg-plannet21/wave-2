import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import axiosInstance from '@/lib/axios-instance';
import { Prompt } from '../types';

interface FormData {
  name: string;
  file: File;
  region_id: number;
  business_unit: string;
}

function getFormData(data: FormData) {
  const formData = new FormData();
  formData.append('audio_file', data.file);
  formData.append(
    'prompt_detail',
    JSON.stringify({
      region: `${data.region_id}`,
      version: 1,
      wording: '',
    })
  );

  formData.append('prompt_name', data.name);
  formData.append('business_unit', data.business_unit);
  formData.append('prompt_folder', '');

  return formData;
}

export interface MessageDTO {
  name: string;
  file: File;
  region_id: number;
  business_unit: string;
}

function useCreateMessage() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: MessageDTO) =>
      axiosInstance
        .post<Prompt>(
          '/prompts/',
          getFormData({
            ...data,
          }),
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => res.data),
    onSuccess(newMessage) {
      queryClient.setQueryData<Prompt[]>(
        getEntityKey('messages'),
        (messages = []) => [newMessage, ...messages]
      );

      addNotification({
        type: 'success',
        title: 'Message Added',
        message: `${newMessage.prompt_name} has been uploaded.`,
        duration: 5000,
      });
    },
  });
}

export default useCreateMessage;
