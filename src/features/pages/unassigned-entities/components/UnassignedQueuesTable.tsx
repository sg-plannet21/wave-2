import { TableColumn } from '@/components/Data-Display/Table';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useUnassignedQueueTableData, {
  UnassignedQueueTableRecord,
} from '../hooks/useUnassignedQueuesTableData';

function UnassignedQueuesTable() {
  const { data, isLoading } = useUnassignedQueueTableData();

  const columns: TableColumn<UnassignedQueueTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
    },
    {
      field: 'businessUnit',
      label: 'Business Unit',
    },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={3} />;

  return (
    <WaveTable<UnassignedQueueTableRecord> data={data} columns={columns} />
  );
}

export default UnassignedQueuesTable;
