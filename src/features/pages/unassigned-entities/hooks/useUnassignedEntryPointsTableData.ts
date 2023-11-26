import { useMemo } from 'react';
import storage from '@/utils/storage';
import useUnassignedEntryPoints from './useUnassignedEntryPoints';

export type UnassignedEntryPointTableRecord = {
  id: string;
  name: string;
  businessUnit: string;
};

function useEntryPointTableData() {
  const { data: entryPoints, isLoading } = useUnassignedEntryPoints();

  const data: UnassignedEntryPointTableRecord[] = useMemo(() => {
    if (!entryPoints) return [];

    const businessUnit = storage.businessUnit.getBusinessUnit().label;

    return entryPoints.map((entryPoint) => ({
      id: entryPoint.entry_point_id,
      name: entryPoint.entry_point,
      businessUnit,
    }));
  }, [entryPoints]);

  return { data, isLoading };
}

export default useEntryPointTableData;
