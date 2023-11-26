import { useMemo } from 'react';
import storage from '@/utils/storage';
import useUnassignedQueues from './useUnassignedQueues';

export type UnassignedQueueTableRecord = {
  id: string;
  name: string;
  businessUnit: string;
};

function useUnassignedQueueTableData() {
  const { data: queues, isLoading } = useUnassignedQueues();

  const data: UnassignedQueueTableRecord[] = useMemo(() => {
    if (!queues) return [];

    const businessUnit = storage.businessUnit.getBusinessUnit().label;

    return queues.map((queue) => ({
      id: queue.queue_id,
      name: queue.queue_name,
      businessUnit,
    }));
  }, [queues]);

  return { data, isLoading };
}

export default useUnassignedQueueTableData;
