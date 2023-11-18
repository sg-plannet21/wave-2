import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { BusinessUnit } from '../types';

function useBusinessUnit(id: string) {
  return useQuery({
    queryKey: ['business-units', id],
    queryFn: () => new ApiClient<BusinessUnit>('/businessunits').get(id),
  });
}

export default useBusinessUnit;
