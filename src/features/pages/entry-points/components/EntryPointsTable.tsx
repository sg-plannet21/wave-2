import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useAuth from '@/state/hooks/useAuth';
import { EntityRoles } from '@/entities/auth';
import useEntryPointTableData, {
  EntryPointTableRecord,
} from '../hooks/useEntryPointTableData';
import DeleteEntryPoint from './DeleteEntryPoint';
import HistoricalCallflow from './HistoricalCallflow';
import CurrentCallflow from './CurrentCallflow';
import EntryPointVersions from './EntryPointVersions';

function EntryPointsTable() {
  const { data, isLoading } = useEntryPointTableData();
  const { hasWriteAccess } = useAuth();

  const EntryPointLink = react.useCallback(
    (record: { entry: EntryPointTableRecord }) => (
      <Link to={record.entry.id}>{record.entry.name}</Link>
    ),
    []
  );

  const SectionLink = react.useCallback(
    (record: { entry: EntryPointTableRecord }) => (
      <Link to={`../schedules/${encodeURI(record.entry.section as string)}`}>
        {record.entry.section}
      </Link>
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

  const History = react.useCallback(
    (record: { entry: EntryPointTableRecord }) => (
      <HistoricalCallflow name={record.entry.name} />
    ),
    []
  );

  const Current = react.useCallback(
    (record: { entry: EntryPointTableRecord }) => (
      <CurrentCallflow id={record.entry.id} name={record.entry.name} />
    ),
    []
  );

  const Versions = react.useCallback(
    (record: { entry: EntryPointTableRecord }) => (
      <EntryPointVersions id={record.entry.id} />
    ),
    []
  );

  const columns: TableColumn<EntryPointTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntryPointLink,
    },
    { field: 'section', label: 'Section', Cell: SectionLink },
    {
      field: 'region',
      label: 'Region',
    },
    {
      field: 'id',
      label: 'Historical Callflow',
      Cell: History,
      ignoreFiltering: true,
    },
    {
      field: 'id',
      label: 'Current Callflow',
      Cell: Current,
      ignoreFiltering: true,
    },
    {
      field: 'id',
      label: 'Versions',
      Cell: Versions,
      ignoreFiltering: true,
    },
  ];

  if (hasWriteAccess([EntityRoles.EntryPoints])) {
    columns.push({
      field: 'id',
      label: '',
      Cell: Delete,
      ignoreFiltering: true,
    });
  }

  if (isLoading) return <WaveTableSkeleton numberOfColumns={3} />;

  return <WaveTable<EntryPointTableRecord> data={data} columns={columns} />;
}

export default EntryPointsTable;
