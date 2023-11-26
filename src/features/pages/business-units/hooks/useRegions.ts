import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { orderBy } from 'lodash';
import { Region } from '../types';

const regionsClient = new ApiClient<Region>('/regions');

function useRegions() {
  return useQuery({
    queryKey: 'regions',
    queryFn: regionsClient.getAll,
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    select(data) {
      return orderBy(data, ['language_name'], 'asc');
    },
  });
}

export default useRegions;
