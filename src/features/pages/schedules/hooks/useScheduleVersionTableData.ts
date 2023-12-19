import { Version } from '@/features/versions/types';
import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { VersionTableRow } from '@/features/versions/components/Versions';
import { useMemo } from 'react';
import deserialiseEntityFields from '@/features/versions/utils/deserialise-entity-fields';
import formatVersionDate from '@/features/versions/utils/format-version-date';
import versionEntityLookup from '@/features/versions/utils/versionEntityLookup';
import { formatServerTime } from '@/lib/date-time';
import { Schedule, Weekdays } from '../types';
import useRoutesLookup from '../../routes/hooks/useRoutesLookup';
import useMessagesLookup from '../../messages/hooks/useMessagesLookup';

interface ScheduleWithVersions extends Schedule {
  versions: Array<Version>;
}

interface ScheduleVersionTableRecord
  extends Pick<Schedule, 'route' | 'start_time' | 'end_time'> {
  message_1: React.ReactNode;
  message_2: React.ReactNode;
  message_3: React.ReactNode;
  message_4: React.ReactNode;
  message_5: React.ReactNode;
  change_date: string;
  change_user: string;
}

const rows: Array<VersionTableRow<ScheduleVersionTableRecord>> = [
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

const scheduleClient = new ApiClient<ScheduleWithVersions>('/schedules');

function useScheduleVersionTableData(id: string, isEnabled = false) {
  const { data } = useQuery({
    queryKey: ['schedule', 'version', id],
    queryFn: () => scheduleClient.get(`${id}?versions=true`),
    enabled: isEnabled,
  });
  const routesLookup = useRoutesLookup();
  const messagesLookup = useMessagesLookup();

  const versions: Array<ScheduleVersionTableRecord> = useMemo(() => {
    if (!data || !routesLookup || !messagesLookup) return [];

    return data.versions.map((version) => {
      const deserialised = deserialiseEntityFields<Schedule>(version);

      return {
        change_date: formatVersionDate(version.change_date),
        change_user: version.change_user,
        route: versionEntityLookup(
          routesLookup,
          deserialised.route,
          'route_name'
        ),
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
        start_time: deserialised.start_time
          ? formatServerTime(deserialised.start_time)
          : 'Default',
        end_time: deserialised.end_time
          ? formatServerTime(deserialised.end_time)
          : 'Default',
      };
    });
  }, [data, messagesLookup, routesLookup]);

  return {
    rows,
    name: data && Weekdays[data.week_day],
    versions,
    isLoading: !data || !routesLookup,
  };
}

export default useScheduleVersionTableData;
