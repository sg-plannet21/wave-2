import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { EntryPoint } from '../types';

const entryPointClient = new ApiClient<EntryPoint>('/entrypoints');

function useEntryPoints() {
  return useQuery({
    queryKey: getEntityKey('entry-points'),
    queryFn: entryPointClient.getAll,
  });
}

export default useEntryPoints;
