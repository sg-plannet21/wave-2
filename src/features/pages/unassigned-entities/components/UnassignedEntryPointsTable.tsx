import { TableColumn } from '@/components/Data-Display/Table';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useEntryPointTableData, {
  UnassignedEntryPointTableRecord,
} from '../hooks/useUnassignedEntryPointsTableData';

function UnassignedEntryPointsTable() {
  const { data, isLoading } = useEntryPointTableData();

  const columns: TableColumn<UnassignedEntryPointTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
    },
    { field: 'businessUnit', label: 'Business Unit' },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={3} />;

  return (
    <WaveTable<UnassignedEntryPointTableRecord> data={data} columns={columns} />
  );
}

export default UnassignedEntryPointsTable;
