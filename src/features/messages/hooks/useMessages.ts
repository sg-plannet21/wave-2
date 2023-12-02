import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { Prompt } from '../types';

const getMessages = new ApiClient<Prompt>('/prompts').getAll;

function useMessages() {
  return useQuery({
    queryFn: getMessages,
    queryKey: getEntityKey('messages'),
  });
}

export default useMessages;
