import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import AudioPlayerDialog from '@/components/Composite/Audio-Player-Dialog';
import { ReactComponent as DownloadIcon } from '@/assets/download.svg';
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

  const Download = react.useCallback(
    (record: { entry: MessageTableRecord }) => (
      <a
        href={record.entry.src}
        target="_blank"
        rel="noreferrer"
        aria-label="download"
        type="button"
        className="p-1 text-emerald-600 dark:text-emerald-400 transition-transform hover:scale-110 outline-none focus:outline-none"
      >
        <DownloadIcon className="w-7 h-7 fill-emerald-600 dark:fill-emerald-400" />
      </a>
    ),
    []
  );

  const Play = react.useCallback(
    (record: { entry: MessageTableRecord }) => (
      <AudioPlayerDialog
        iconClassName="w-7 h-7"
        trackList={{
          src: record.entry.src,
          name: record.entry.name,
        }}
      />
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
    { field: 'id', label: 'Download', ignoreFiltering: true, Cell: Download },
    { field: 'id', label: 'Play', ignoreFiltering: true, Cell: Play },
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
