import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { orderBy } from 'lodash';
import { Prompt } from '../types';

const getMessages = new ApiClient<Prompt>('/prompts').getAll;

function orderByName(data: Prompt[]): Prompt[] {
  return orderBy(data, ['prompt_name'], 'asc');
}

function useMessages() {
  return useQuery({
    queryFn: getMessages,
    queryKey: getEntityKey('messages'),
    select: orderByName,
  });
}

export default useMessages;
