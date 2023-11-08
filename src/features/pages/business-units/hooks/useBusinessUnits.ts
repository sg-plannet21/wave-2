import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import businessUnitQueryKey from '@/lib/business-unit-query-key';
import { BusinessUnit } from '../types';

const businessUnitsFetcher = new ApiClient<BusinessUnit>('/businessunits');

function useBusinessUnits() {
  return useQuery({
    queryKey: businessUnitQueryKey('business-units'),
    queryFn: businessUnitsFetcher.getAll,
  });
}

export default useBusinessUnits;
