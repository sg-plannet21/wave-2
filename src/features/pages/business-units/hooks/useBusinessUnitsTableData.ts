import { useMemo } from 'react';
import useBusinessUnits from './useBusinessUnits';

export type BusinessUnitTableRecord = {
  id: string;
  name: string;
};

function useBusinessUnitsTableData() {
  const { data: businessUnits, isLoading, error } = useBusinessUnits();

  const data = useMemo(() => {
    if (!businessUnits) return [];

    return businessUnits.map((bu) => ({
      id: bu.business_unit_id,
      name: bu.business_unit,
    }));
  }, [businessUnits]);

  return { data, isLoading, error };
}

export default useBusinessUnitsTableData;
