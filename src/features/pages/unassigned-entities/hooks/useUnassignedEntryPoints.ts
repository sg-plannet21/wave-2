import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { EntryPoint } from '../../entry-points/types';

const getUnassignedEntryPoints = new ApiClient<EntryPoint>(
  '/entrypoints/?unassigned=true'
).getAll;

function useUnassignedEntryPoints() {
  return useQuery({
    queryKey: 'unassigned-entry-points',
    queryFn: getUnassignedEntryPoints,
  });
}

export default useUnassignedEntryPoints;
