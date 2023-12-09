import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useSectionsTableData, {
  SectionTableRecord,
} from '../hooks/useSectionsTableData';
import DeleteSection from './DeleteSection';

function BusinessUnitsTable() {
  const { data, isLoading } = useSectionsTableData();

  const EntityLink = react.useCallback(
    (section: { entry: SectionTableRecord }) => (
      <Link to={section.entry.id}>{section.entry.name}</Link>
    ),
    []
  );

  const Delete = react.useCallback(
    (section: { entry: SectionTableRecord }) => (
      <div className="text-right">
        <DeleteSection id={section.entry.id} name={section.entry.name} />
      </div>
    ),
    []
  );

  const columns: TableColumn<SectionTableRecord>[] = [
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

  return <WaveTable<SectionTableRecord> data={data} columns={columns} />;
}

export default BusinessUnitsTable;
