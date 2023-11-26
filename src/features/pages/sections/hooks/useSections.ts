import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { orderBy } from 'lodash';
import { Section } from '../types';

const getSections = new ApiClient<Section>('/section').getAll;

function useSections() {
  return useQuery({
    queryKey: getEntityKey('sections'),
    queryFn: getSections,
    select(data) {
      return orderBy(data, ['section'], 'asc');
    },
  });
}

export default useSections;
