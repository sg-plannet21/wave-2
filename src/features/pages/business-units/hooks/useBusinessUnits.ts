import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { BusinessUnit } from '../types';

const getBusinessUnits = new ApiClient<BusinessUnit>('/businessunits').getAll;

function useBusinessUnits() {
  return useQuery({
    queryKey: 'business-units',
    queryFn: getBusinessUnits,
  });
}

export default useBusinessUnits;
