import { Version } from '@/features/versions/types';
import { VersionTableRow } from '@/features/versions/components/Versions';
import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { useMemo } from 'react';
import deserialiseEntityFields from '@/features/versions/utils/deserialise-entity-fields';
import formatVersionDate from '@/features/versions/utils/format-version-date';
import versionEntityLookup from '@/features/versions/utils/versionEntityLookup';
import useRoutesLookup from '../../routes/hooks/useRoutesLookup';
import useMessagesLookup from '../../messages/hooks/useMessagesLookup';
import { ScheduleException } from '../types';

interface ExceptionWithVersions extends ScheduleException {
  versions: Array<Version>;
}

interface ExceptionVersionRecord
  extends Pick<
    ScheduleException,
    'route' | 'start_time' | 'end_time' | 'description'
  > {
  message_1: React.ReactNode;
  message_2: React.ReactNode;
  message_3: React.ReactNode;
  message_4: React.ReactNode;
  message_5: React.ReactNode;
  change_date: string;
  change_user: string;
}

const rows: Array<VersionTableRow<ExceptionVersionRecord>> = [
  { field: 'change_date', label: 'Change Date' },
  { field: 'change_user', label: 'Change User' },
  { field: 'start_time', label: 'Start Time' },
  { field: 'end_time', label: 'End Time' },
  { field: 'message_1', label: 'Message 1' },
  { field: 'message_2', label: 'Message 2' },
  { field: 'message_3', label: 'Message 3' },
  { field: 'message_4', label: 'Message 4' },
  { field: 'message_5', label: 'Message 5' },
  { field: 'route', label: 'Route' },
];

const exceptionClient = new ApiClient<ExceptionWithVersions>('/scheduleexceptions');

function useExceptionVersionData(id: string) {
  const { data } = useQuery({
    queryKey: ['schedule', 'version', id],
    queryFn: () => exceptionClient.get(`${id}?versions=true`),
    enabled: !!id,
  });
  const routesLookup = useRoutesLookup();
  const messagesLookup = useMessagesLookup();

  const versions: Array<ExceptionVersionRecord> = useMemo(() => {
    if (!data || !routesLookup || !messagesLookup) return [];

    return data.versions.map((version) => {
      const deserialised = deserialiseEntityFields<ScheduleException>(version);

      return {
        change_date: formatVersionDate(version.change_date),
        change_user: version.change_user,
        description: deserialised.description,
        start_time: formatVersionDate(deserialised.start_time),
        end_time: formatVersionDate(deserialised.end_time),
        message_1: versionEntityLookup(
          messagesLookup,
          deserialised.message_1,
          'prompt_name'
        ),
        message_2: versionEntityLookup(
          messagesLookup,
          deserialised.message_2,
          'prompt_name'
        ),
        message_3: versionEntityLookup(
          messagesLookup,
          deserialised.message_3,
          'prompt_name'
        ),
        message_4: versionEntityLookup(
          messagesLookup,
          deserialised.message_4,
          'prompt_name'
        ),
        message_5: versionEntityLookup(
          messagesLookup,
          deserialised.message_5,
          'prompt_name'
        ),
        route: versionEntityLookup(
          routesLookup,
          deserialised.route,
          'route_name'
        ),
      };
    });
  }, [data, messagesLookup, routesLookup]);

  return {
    versions,
    isLoading: !data || !messagesLookup || !routesLookup,
    name: data?.description,
    rows,
  };
}

export default useExceptionVersionData;
