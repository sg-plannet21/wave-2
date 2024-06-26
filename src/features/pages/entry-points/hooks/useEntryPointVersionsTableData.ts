import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Version } from '@/features/versions/types';
import { useMemo } from 'react';
import deserialiseEntityFields from '@/features/versions/utils/deserialise-entity-fields';
import { VersionTableRow } from '@/features/versions/components/Versions';
import formatVersionDate from '@/features/versions/utils/format-version-date';
import versionEntityLookup from '@/features/versions/utils/versionEntityLookup';
import { EntryPoint } from '../types';
import useSectionsLookup from '../../sections/hooks/useSectionsLookup';
import useRegionsLookup from '../../business-units/hooks/useRegionsLookup';

interface EntryPointWithVersions extends EntryPoint {
  versions: Array<Version>;
}

interface EntryPointVersionTableRecord
  extends Pick<EntryPoint, 'entry_point' | 'section'> {
  change_date: string;
  change_user: string;
  region: string;
}

const rows: Array<VersionTableRow<EntryPointVersionTableRecord>> = [
  { field: 'change_date', label: 'Change Date' },
  { field: 'change_user', label: 'Change User' },
  { field: 'entry_point', label: 'Entry Point' },
  { field: 'region', label: 'Region' },
  { field: 'section', label: 'Section' },
];

const entryPointClient = new ApiClient<EntryPointWithVersions>('/entrypoints');

function useEntryPointVersionsTableData(id: string) {
  const { data } = useQuery({
    queryKey: ['entry-point', 'version', id],
    queryFn: () => entryPointClient.get(`${id}?versions=true`),
    enabled: !!id,
  });
  const sectionsLookup = useSectionsLookup();
  const regionsLookup = useRegionsLookup();

  const versions: EntryPointVersionTableRecord[] = useMemo(() => {
    if (!data || !sectionsLookup || !regionsLookup) return [];

    return data.versions.map((version) => {
      const deserialised = deserialiseEntityFields<EntryPoint>(version);

      return {
        change_date: formatVersionDate(version.change_date),
        change_user: version.change_user,
        entry_point: deserialised.entry_point,
        section: versionEntityLookup(
          sectionsLookup,
          deserialised.section,
          'section'
        ),
        region: versionEntityLookup(
          regionsLookup,
          deserialised.region,
          'language_name'
        ),
      } satisfies EntryPointVersionTableRecord;
    });
  }, [data, sectionsLookup, regionsLookup]);

  return {
    rows,
    name: data?.entry_point,
    versions,
    isLoading: !data || !sectionsLookup || !regionsLookup,
  };
}

export default useEntryPointVersionsTableData;
