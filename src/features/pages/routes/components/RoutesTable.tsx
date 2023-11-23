import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useRoutesTableData, {
  RouteTableRecord,
} from '../hooks/useRoutesTableData';
import DeleteRoute from './DeleteRoute';

function RoutesTable() {
  const { data, isLoading } = useRoutesTableData();

  const EntityLink = react.useCallback(
    (record: { entry: RouteTableRecord }) => (
      <Link to={record.entry.id}>{record.entry.name}</Link>
    ),
    []
  );

  /*
  const RouteType = react.useCallback((record: { entry: RouteTableRecord }) => {
    const {
      entry: { isSystemRoute },
    } = record;
    return (
      <Badge
        variant={isSystemRoute ? 'secondary' : 'primary'}
        label={isSystemRoute ? 'System' : 'Custom'}
      />
    );
  }, []);
    */

  const Delete = react.useCallback(
    (record: { entry: RouteTableRecord }) => (
      <div className="text-right">
        <DeleteRoute id={record.entry.id} name={record.entry.name} />
      </div>
    ),
    []
  );

  const columns: TableColumn<RouteTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntityLink,
    },
    {
      field: 'destination',
      label: 'Destination',
    },
    { field: 'destinationType', label: 'Type' },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Delete,
    },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={3} />;

  return <WaveTable<RouteTableRecord> data={data} columns={columns} />;
}

export default RoutesTable;
