import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useExceptionsTableData, {
  ExceptionTableRecord,
} from '../hooks/useExceptionsTableData';
import DeleteException from './DeleteException';

function ExceptionsTable() {
  const { data, isLoading } = useExceptionsTableData();

  const EntityLink = react.useCallback(
    (section: { entry: ExceptionTableRecord }) => (
      <Link to={section.entry.id}>{section.entry.name}</Link>
    ),
    []
  );

  const Delete = react.useCallback(
    (section: { entry: ExceptionTableRecord }) => (
      <div className="text-right">
        <DeleteException id={section.entry.id} name={section.entry.name} />
      </div>
    ),
    []
  );

  const columns: TableColumn<ExceptionTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntityLink,
    },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Delete,
    },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={2} />;

  return <WaveTable<ExceptionTableRecord> data={data} columns={columns} />;
}

export default ExceptionsTable;
