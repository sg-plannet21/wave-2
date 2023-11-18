import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { BusinessUnit } from '../types';

const businessUnitsFetcher = new ApiClient<BusinessUnit>('/businessunits');

function useBusinessUnits() {
  return useQuery({
    queryKey: 'business-units',
    queryFn: businessUnitsFetcher.getAll,
  });
}

export default useBusinessUnits;
