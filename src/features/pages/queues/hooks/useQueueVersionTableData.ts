import { Version } from '@/features/versions/types';
import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { useMemo } from 'react';
import formatVersionDate from '@/features/versions/utils/format-version-date';
import deserialiseEntityFields from '@/features/versions/utils/deserialise-entity-fields';
import { get } from 'lodash';
import { VersionTableRow } from '@/features/versions/components/Versions';
import { Queue } from '../types';
import useMessagesLookup from '../../messages/hooks/useMessagesLookup';
import useRoutesLookup from '../../routes/hooks/useRoutesLookup';

interface QueueWithVersions extends Queue {
  versions: Array<Version>;
}

type MessageRecordType = string | null;

interface QueueVersionTableRecord
  extends Pick<
    Queue,
    | 'queue_priority'
    | 'closed_route'
    | 'no_agents_route'
    | 'max_queue_calls_threshold'
    | 'max_queue_calls_route'
    | 'max_queue_time_threshold'
    | 'max_queue_time_route'
    | 'callback_route'
    | 'callback_calls_threshold'
    | 'callback_time_threshold'
  > {
  change_date: string;
  change_user: string;
  queue_music: MessageRecordType;
  queue_welcome: MessageRecordType;
  whisper_message: MessageRecordType;
  queue_message_1: MessageRecordType;
  queue_message_2: MessageRecordType;
  queue_message_3: MessageRecordType;
  queue_message_4: MessageRecordType;
  queue_message_5: MessageRecordType;
  closed_toggle: string;
  closed_message: MessageRecordType;
  no_agents_toggle: string;
  no_agents_message: MessageRecordType;
  max_queue_calls_toggle: string;
  max_queue_calls_message: MessageRecordType;
  max_queue_time_toggle: string;
  max_queue_time_message: MessageRecordType;
  callback_toggle: string;
}

const rows: Array<VersionTableRow<QueueVersionTableRecord>> = [
  { field: 'change_date', label: 'Change Date' },
  { field: 'change_user', label: 'Change User' },
  { field: 'queue_priority', label: 'Priority' },
  { field: 'whisper_message', label: 'Whisper Announcement' },
  { field: 'queue_welcome', label: 'Welcome' },
  { field: 'queue_music', label: 'Queue Music' },
  { field: 'queue_message_1', label: 'Message 1' },
  { field: 'queue_message_2', label: 'Message 2' },
  { field: 'queue_message_3', label: 'Message 3' },
  { field: 'queue_message_4', label: 'Message 4' },
  { field: 'queue_message_5', label: 'Message 5' },
  { field: 'closed_toggle', label: 'Closed Status' },
  { field: 'closed_message', label: 'Closed Message' },
  { field: 'closed_route', label: 'Closed Route' },
  { field: 'no_agents_toggle', label: 'No Agents Status' },
  { field: 'no_agents_message', label: 'No Agents Message' },
  { field: 'no_agents_route', label: 'No Agents Route' },
  { field: 'max_queue_calls_toggle', label: 'Max Queue Calls Status' },
  { field: 'max_queue_calls_threshold', label: 'Max Queue Calls Threshold' },
  { field: 'max_queue_calls_message', label: 'Max Queue Calls Message' },
  { field: 'max_queue_calls_route', label: 'Max Queue Calls Route' },
  { field: 'max_queue_time_toggle', label: 'Max Queue Time Status' },
  { field: 'max_queue_time_threshold', label: 'Max Queue Time Threshold' },
  { field: 'max_queue_time_message', label: 'Max Queue Time Message' },
  { field: 'max_queue_time_route', label: 'Max Queue Time Route' },
  { field: 'callback_toggle', label: 'Callback Status' },
  { field: 'callback_calls_threshold', label: 'Callback Calls Threshold' },
  { field: 'callback_time_threshold', label: 'Callback Time Threshold' },
  { field: 'callback_route', label: 'Callback Route' },
];

const queueClient = new ApiClient<QueueWithVersions>('/queues');

function useQueueVersionTableData(id: string) {
  const { data } = useQuery({
    queryKey: ['queue', 'version', id],
    queryFn: () => queueClient.get(`${id}?versions=true`),
    enabled: !!id,
  });
  const messageLookup = useMessagesLookup();
  const routeLookup = useRoutesLookup();

  const versions: Array<QueueVersionTableRecord> = useMemo(() => {
    if (!data || !messageLookup || !useRoutesLookup) return [];

    function getPromptName(queueId: number | null): MessageRecordType {
      return queueId && messageLookup
        ? get(messageLookup[queueId], 'prompt_name')
        : null;
    }

    function getRouteName(routeId: string | null): string | null {
      return routeId && routeLookup
        ? get(routeLookup[routeId], 'route_name')
        : null;
    }

    return data.versions.map((version) => {
      const deserialised = deserialiseEntityFields<Queue>(version);

      return {
        change_date: formatVersionDate(version.change_date),
        change_user: version.change_user,
        queue_priority: deserialised.queue_priority,
        whisper_message: getPromptName(deserialised.whisper_message),
        queue_welcome: getPromptName(deserialised.queue_welcome),
        queue_music: getPromptName(deserialised.queue_music),
        queue_message_1: getPromptName(deserialised.queue_message_1),
        queue_message_2: getPromptName(deserialised.queue_message_2),
        queue_message_3: getPromptName(deserialised.queue_message_3),
        queue_message_4: getPromptName(deserialised.queue_message_4),
        queue_message_5: getPromptName(deserialised.queue_message_5),
        closed_toggle: deserialised.closed_toggle ? 'Enabled' : 'Disabled',
        closed_message: getPromptName(deserialised.closed_message),
        closed_route: getRouteName(deserialised.closed_route),
        no_agents_toggle: deserialised.no_agents_toggle
          ? 'Enabled'
          : 'Disabled',
        no_agents_message: getPromptName(deserialised.no_agents_message),
        no_agents_route: getRouteName(deserialised.no_agents_route),
        max_queue_calls_toggle: deserialised.max_queue_calls_toggle
          ? 'Enabled'
          : 'Disabled',
        max_queue_calls_threshold: deserialised.max_queue_calls_threshold,
        max_queue_calls_message: getPromptName(
          deserialised.max_queue_calls_message
        ),
        max_queue_calls_route: getRouteName(deserialised.max_queue_calls_route),
        max_queue_time_toggle: deserialised.max_queue_time_toggle
          ? 'Enabled'
          : 'Disabled',
        max_queue_time_threshold: deserialised.max_queue_time_threshold,
        max_queue_time_message: getPromptName(
          deserialised.max_queue_time_message
        ),
        max_queue_time_route: getRouteName(deserialised.max_queue_time_route),
        callback_toggle: deserialised.callback_toggle ? 'Enabled' : 'Disabled',
        callback_calls_threshold: deserialised.callback_calls_threshold,
        callback_time_threshold: deserialised.callback_time_threshold,
        callback_route: getRouteName(deserialised.callback_route),
      };
    });
  }, [data, messageLookup, routeLookup]);

  return {
    rows,
    name: data?.queue_name,
    versions,
    isLoading: !data || !messageLookup || !routeLookup,
  };
}
export default useQueueVersionTableData;
