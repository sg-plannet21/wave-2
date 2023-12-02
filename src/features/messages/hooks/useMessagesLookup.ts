import entityLookup from '@/lib/entity-lookup';
import { Prompt } from '../types';
import useMessages from './useMessages';

function useMessagesLookup() {
  const { data } = useMessages();

  return data && entityLookup<Prompt>(data, 'prompt_id');
}

export default useMessagesLookup;
