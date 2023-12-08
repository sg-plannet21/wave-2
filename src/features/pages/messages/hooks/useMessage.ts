import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Prompt } from '../types';

function useMessage(id: string) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: () => new ApiClient<Prompt>('/prompts').get(id),
    enabled: !!id,
  });
}

export default useMessage;
