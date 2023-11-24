import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { BusinessUnitRole } from '../../business-units/types';

const getUsers = new ApiClient<BusinessUnitRole>('/businessunitroles').getAll;

function useBusinessUnitRoles() {
  return useQuery({
    queryKey: getEntityKey('business-unit-roles'),
    queryFn: getUsers,
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
}

export default useBusinessUnitRoles;
