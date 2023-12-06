import { useMemo } from 'react';
import { get } from 'lodash';
import useQueues from './useQueues';
import useRoutesLookup from '../../routes/hooks/useRoutesLookup';

interface RouteStatus {
  closed_route: React.ReactNode;
  no_agents_route: React.ReactNode;
  max_queue_calls_route: React.ReactNode;
  max_queue_time_route: React.ReactNode;
  callback_route: React.ReactNode;
}

export interface QueueTableRecord extends RouteStatus {
  id: string;
  name: string;
  priority: number;
}

const routeStatusList: Array<keyof RouteStatus> = [
  'closed_route',
  'no_agents_route',
  'max_queue_calls_route',
  'max_queue_time_route',
  'callback_route',
];

function useQueuesTableData() {
  const { data: queues } = useQueues();
  const routesLookup = useRoutesLookup();

  const data: QueueTableRecord[] = useMemo(() => {
    if (!queues || !routesLookup) return [];

    return queues.map((queue) => ({
      id: queue.queue_id,
      name: queue.queue_name,
      priority: queue.queue_priority,

      ...routeStatusList.reduce((acc, route) => {
        const destination = queue[route];
        acc[route] =
          destination && get(routesLookup[destination], 'route_name');

        return acc;
      }, {} as RouteStatus),
    }));
  }, [queues, routesLookup]);

  return { data, isLoading: !queues || !routesLookup };
}

export default useQueuesTableData;
