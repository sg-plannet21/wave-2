import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import businessUnitQueryKey from '@/lib/business-unit-query-key';
import { BusinessUnit } from '../types';

function useBusinessUnit(id: string) {
  return useQuery({
    queryKey: businessUnitQueryKey('busines-unit', id),
    queryFn: () => new ApiClient<BusinessUnit>('/businessunits').get(id),
  });
}

export default useBusinessUnit;
