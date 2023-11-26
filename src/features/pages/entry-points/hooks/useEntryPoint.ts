import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { EntryPoint } from '../types';

const entryPointClient = new ApiClient<EntryPoint>('/entrypoints');

function useEntryPoint(id: string) {
  return useQuery({
    queryKey: ['entry-point', id],
    queryFn: () => entryPointClient.get(id),
    enabled: !!id,
  });
}

export default useEntryPoint;
