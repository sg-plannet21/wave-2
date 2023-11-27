import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { Section } from '../types';

const getSections = new ApiClient<Section>('/section').getAll;

function useSections() {
  return useQuery({
    queryKey: getEntityKey('sections'),
    queryFn: getSections,
  });
}

export default useSections;
