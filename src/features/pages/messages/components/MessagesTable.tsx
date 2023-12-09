import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useMessagesTableData, {
  MessageTableRecord,
} from '../hooks/useMessagesTableData';
import DeleteMessage from './DeleteMessage';

function MessagesTable() {
  const { data, isLoading } = useMessagesTableData();

  const EntityLink = react.useCallback(
    (message: { entry: MessageTableRecord }) => (
      <Link to={message.entry.id.toString()}>{message.entry.name}</Link>
    ),
    []
  );

  const Delete = react.useCallback(
    (message: { entry: MessageTableRecord }) => (
      <div className="text-right">
        <DeleteMessage
          id={String(message.entry.id)}
          name={message.entry.name}
        />
      </div>
    ),
    []
  );

  const columns: TableColumn<MessageTableRecord>[] = [
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

  return <WaveTable<MessageTableRecord> data={data} columns={columns} />;
}

export default MessagesTable;
