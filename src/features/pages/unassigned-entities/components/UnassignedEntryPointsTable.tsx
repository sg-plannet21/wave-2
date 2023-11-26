import { TableColumn } from '@/components/Data-Display/Table';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import Button from '@/components/Inputs/Button';
import react from 'react';
import useEntryPointTableData, {
  UnassignedEntryPointTableRecord,
} from '../hooks/useUnassignedEntryPointsTableData';
import useAssignEntryPoint from '../hooks/useAssignEntryPoint';

function UnassignedEntryPointsTable() {
  const { data, isLoading } = useEntryPointTableData();
  const mutation = useAssignEntryPoint();

  const AssignEntity = react.useCallback(
    (record: { entry: UnassignedEntryPointTableRecord }) => (
      <Button
        type="button"
        className="w-24 ml-auto"
        variant="primary"
        onClick={() =>
          mutation.mutateAsync({
            id: record.entry.id,
            entry_point: record.entry.name,
          })
        }
      >
        Assign
      </Button>
    ),
    []
  );

  const columns: TableColumn<UnassignedEntryPointTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
    },
    { field: 'businessUnit', label: 'Business Unit', ignoreFiltering: true },
    { field: 'id', label: '', Cell: AssignEntity, ignoreFiltering: true },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={3} />;

  return (
    <WaveTable<UnassignedEntryPointTableRecord> data={data} columns={columns} />
  );
}

export default UnassignedEntryPointsTable;
