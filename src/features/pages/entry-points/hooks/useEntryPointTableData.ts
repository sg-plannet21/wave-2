import { useMemo } from 'react';
import { get } from 'lodash';
import useEntryPoints from './useEntryPoints';
import useRegionsLookup from '../../business-units/hooks/useRegionsLookup';
import useSectionsLookup from '../../sections/hooks/useSectionsLookup';

export type EntryPointTableRecord = {
  id: string;
  name: string;
  section?: string;
  region?: string;
};

function useEntryPointTableData() {
  const { data: entryPoints } = useEntryPoints();
  const regionsLookup = useRegionsLookup();
  const sectionsLookup = useSectionsLookup();

  const data = useMemo(() => {
    if (!entryPoints || !regionsLookup || !sectionsLookup) return [];

    return entryPoints.map((entryPoint) => ({
      id: entryPoint.entry_point_id,
      name: entryPoint.entry_point,
      section: get(sectionsLookup[entryPoint.section], 'section'),
      region: get(regionsLookup[entryPoint.region], 'language_name'),
    }));
  }, [entryPoints, regionsLookup, sectionsLookup]);

  return { data, isLoading: !entryPoints || !regionsLookup || !sectionsLookup };
}

export default useEntryPointTableData;
