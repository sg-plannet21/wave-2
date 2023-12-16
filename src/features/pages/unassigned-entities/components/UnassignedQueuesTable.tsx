import { TableColumn } from '@/components/Data-Display/Table';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import Button from '@/components/Inputs/Button';
import react from 'react';
import useUnassignedQueueTableData, {
  UnassignedQueueTableRecord,
} from '../hooks/useUnassignedQueuesTableData';
import useAssignQueue from '../hooks/useAssignQueue';

function UnassignedQueuesTable() {
  const { data, isLoading } = useUnassignedQueueTableData();
  const mutation = useAssignQueue();

  const AssignQueue = react.useCallback(
    (record: { entry: UnassignedQueueTableRecord }) => (
      <Button
        type="button"
        className="w-24 ml-auto"
        variant="primary"
        onClick={() =>
          mutation.mutateAsync({
            id: record.entry.id,
            queue_name: record.entry.name,
          })
        }
      >
        Assign
      </Button>
    ),
    []
  );

  const columns: TableColumn<UnassignedQueueTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
    },
    {
      field: 'businessUnit',
      label: 'Business Unit',
      ignoreFiltering: true,
    },
    { field: 'id', label: '', Cell: AssignQueue, ignoreFiltering: true },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={3} />;

  return (
    <WaveTable<UnassignedQueueTableRecord> data={data} columns={columns} />
  );
}

export default UnassignedQueuesTable;
