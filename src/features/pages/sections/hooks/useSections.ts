import ApiClient from '@/services/api-client';
import { UseQueryOptions, useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { Section } from '../types';

const getSections = new ApiClient<Section>('/section').getAll;

function useSections(options?: UseQueryOptions<Section[]>) {
  return useQuery({
    queryKey: getEntityKey('sections'),
    queryFn: getSections,
    ...options,
  });
}

export default useSections;
