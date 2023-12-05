import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Version } from '@/features/versions/types';
import { useMemo } from 'react';
import deserialiseEntityFields from '@/features/versions/utils/deserialise-entity-fields';
import { VersionTableRow } from '@/features/versions/components/Versions';
import { get } from 'lodash';
import formatVersionDate from '@/features/versions/utils/format-version-date';
import { Menu } from '../types';
import useRoutesLookup from '../../routes/hooks/useRoutesLookup';
import useMessagesLookup from '../../messages/hooks/useMessagesLookup';
import { menuOptions } from '../types/schema';

interface MenuWithVersions extends Menu {
  versions: Version[];
}

type MenuRecord<Type> = {
  [Property in keyof Type]: React.ReactNode;
};

interface MenuVersionTableRecord extends Partial<MenuRecord<Menu>> {
  change_date: string;
  change_user: string;
}

const optionRows: Array<VersionTableRow<MenuVersionTableRecord>> =
  menuOptions.reduce(
    (acc, option) => {
      const routeRow: VersionTableRow<MenuVersionTableRecord> = {
        field: `${option.prefix}_route` as keyof MenuVersionTableRecord,
        label: `${option.label} Route`,
      };

      const messageRow: VersionTableRow<MenuVersionTableRecord> = {
        field: `${option.prefix}_message` as keyof MenuVersionTableRecord,
        label: `${option.label} Message`,
      };
      return acc.concat([messageRow, routeRow]);
    },
    [] as Array<VersionTableRow<MenuVersionTableRecord>>
  );

const rows: Array<VersionTableRow<MenuVersionTableRecord>> = [
  { field: 'change_date', label: 'Change Date' },
  { field: 'change_user', label: 'Change User' },
  { field: 'menu_name', label: 'Name' },
  { field: 'max_retries', label: 'Max Retries' },
  ...optionRows,
];

const entryPointClient = new ApiClient<MenuWithVersions>('/menus');

function useMenuVersionsTableData(id: string) {
  const { data } = useQuery({
    queryKey: ['menu', 'version', id],
    queryFn: () => entryPointClient.get(`${id}?versions=true`),
    enabled: !!id,
  });
  const routesLookup = useRoutesLookup();
  const messagesLookup = useMessagesLookup();

  const versions: MenuVersionTableRecord[] = useMemo(() => {
    if (!data || !routesLookup || !messagesLookup) return [];

    return data.versions.map((version) => {
      const deserialised = deserialiseEntityFields<Menu>(version);

      return {
        menu_name: deserialised.menu_name,
        max_retries: deserialised.max_retries,

        ...menuOptions.reduce((acc, item) => {
          const messageKey = `${item.prefix}_message` as keyof Menu;
          acc[messageKey] =
            deserialised[messageKey] &&
            get(
              messagesLookup[deserialised[messageKey] as keyof Menu],
              'prompt_name'
            );

          const routeKey = `${item.prefix}_route` as keyof Menu;
          acc[routeKey] =
            deserialised[routeKey] &&
            get(
              routesLookup[deserialised[routeKey] as keyof Menu],
              'route_name'
            );
          return acc;
        }, {} as MenuVersionTableRecord),

        change_date: formatVersionDate(version.change_date),
        change_user: version.change_user,
      } satisfies MenuVersionTableRecord;
    });
  }, [data, routesLookup, messagesLookup]);

  return {
    rows,
    name: data?.menu_name,
    versions,
    isLoading: !data || !routesLookup || !messagesLookup,
  };
}

export default useMenuVersionsTableData;
