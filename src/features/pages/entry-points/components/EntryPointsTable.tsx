import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useEntryPointTableData, {
  EntryPointTableRecord,
} from '../hooks/useEntryPointTableData';
import DeleteEntryPoint from './DeleteEntryPoint';

function EntryPointsTable() {
  const { data, isLoading } = useEntryPointTableData();

  const EntryPointLink = react.useCallback(
    (record: { entry: EntryPointTableRecord }) => (
      <Link to={record.entry.id}>{record.entry.name}</Link>
    ),
    []
  );

  const Delete = react.useCallback(
    (record: { entry: EntryPointTableRecord }) => (
      <div className="text-right">
        <DeleteEntryPoint id={record.entry.id} name={record.entry.name} />
      </div>
    ),
    []
  );

  const columns: TableColumn<EntryPointTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntryPointLink,
    },
    {
      field: 'region',
      label: 'Region',
    },
    { field: 'section', label: 'Section' },
    { field: 'id', label: '', Cell: Delete, ignoreFiltering: true },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={3} />;

  return <WaveTable<EntryPointTableRecord> data={data} columns={columns} />;
}

export default EntryPointsTable;
