import { Meta, StoryObj } from '@storybook/react';
import { TableColumn } from '@/components/Data-Display/Table';
import { useState } from 'react';
import paginate from '@/lib/paginate';
import Button from '@/components/Inputs/Button';
import Table from '@/components/Data-Display/Table/Table';
import Pagination from '.';

const meta = {
  component: Pagination,
  title: 'Navigation/Pagination',
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;
export default meta;

type Story = StoryObj<typeof meta>;

type LeagueEntry = {
  id: string;
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
};

const tableData: LeagueEntry[] = [
  {
    id: '1',
    name: 'Manchester United',
    played: 12,
    wins: 6,
    draws: 3,
    losses: 3,
  },
  {
    id: '2',
    name: 'Manchester City',
    played: 12,
    wins: 8,
    draws: 3,
    losses: 1,
  },
  {
    id: '3',
    name: 'Arsenal',
    played: 12,
    wins: 9,
    draws: 1,
    losses: 2,
  },
  {
    id: '4',
    name: 'Liverpool',
    played: 12,
    wins: 5,
    draws: 4,
    losses: 3,
  },
  {
    id: '5',
    name: 'Brighton',
    played: 12,
    wins: 4,
    draws: 6,
    losses: 2,
  },
  {
    id: '6',
    name: 'Everton',
    played: 12,
    wins: 3,
    draws: 5,
    losses: 4,
  },
  {
    id: '7',
    name: 'Chelsea',
    played: 12,
    wins: 4,
    draws: 4,
    losses: 4,
  },
  {
    id: '8',
    name: 'Aston Villa',
    played: 12,
    wins: 2,
    draws: 5,
    losses: 5,
  },
  {
    id: '9',
    name: 'Brentford',
    played: 12,
    wins: 3,
    draws: 6,
    losses: 3,
  },
  {
    id: '10',
    name: 'Nottingham Forrest',
    played: 12,
    wins: 2,
    draws: 6,
    losses: 4,
  },
  {
    id: '11',
    name: 'Tottenham',
    played: 12,
    wins: 6,
    draws: 3,
    losses: 3,
  },
  {
    id: '12',
    name: 'Newcastle',
    played: 12,
    wins: 8,
    draws: 2,
    losses: 2,
  },
  {
    id: '13',
    name: 'Fulham',
    played: 12,
    wins: 3,
    draws: 3,
    losses: 6,
  },
  {
    id: '14',
    name: 'Leicester',
    played: 12,
    wins: 5,
    draws: 2,
    losses: 5,
  },
  {
    id: '15',
    name: 'Southampton',
    played: 12,
    wins: 2,
    draws: 4,
    losses: 6,
  },
  {
    id: '16',
    name: 'Wolves',
    played: 12,
    wins: 2,
    draws: 5,
    losses: 5,
  },
  {
    id: '17',
    name: 'West Ham',
    played: 12,
    wins: 3,
    draws: 6,
    losses: 4,
  },
  {
    id: '18',
    name: 'Leeds Utd',
    played: 12,
    wins: 1,
    draws: 5,
    losses: 6,
  },
  {
    id: '19',
    name: 'Bournemouth',
    played: 12,
    wins: 2,
    draws: 7,
    losses: 3,
  },
  {
    id: '20',
    name: 'Crystal Palace',
    played: 12,
    wins: 4,
    draws: 4,
    losses: 4,
  },
];

const leagueTableColumns: TableColumn<LeagueEntry>[] = [
  {
    field: 'name',
    label: 'Name',
    Cell: ({ entry }: { entry: { name: string } }) => (
      <span className="text-indigo-500">{entry.name}</span>
    ),
  },
  { field: 'wins', label: 'Wins' },
  { field: 'played', label: 'Played' },
  { field: 'draws', label: 'Draws' },
  { field: 'losses', label: 'Losses' },
];
function TableExample() {
  const [pageSize, setPageSize] = useState(5);
  const [entries, setEntries] = useState<LeagueEntry[]>(tableData.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);

  function pagedData(): LeagueEntry[] {
    return paginate(entries ?? [], currentPage, pageSize);
  }

  return (
    <div className="flex flex-col p-4 min-h-screen">
      <h1 className="text-center font-bold text-2xl text-emerald-700">
        League Table
      </h1>
      <div className="flex justify-between items-center px-4 my-1">
        <div className="flex items-center space-x-1">
          <h4 className="text-xl font-bold text-gray-900 dark:text-teal-600">
            PageSize:
          </h4>
          <span className="bg-blue-100 text-blue-800 font-semibold mr-2 p-1 rounded dark:bg-blue-200 dark:text-blue-800">
            {pageSize}
          </span>
          <Button
            type="button"
            onClick={() => {
              if (pageSize < tableData.length) {
                setPageSize((prev) => prev + 1);
              }
            }}
            variant="primary"
          >
            Increment
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (pageSize > 0) {
                setPageSize((prev) => prev - 1);
              }
            }}
            variant="danger"
          >
            Decrement
          </Button>
        </div>
        <div className="flex items-center space-x-1">
          <h4 className="text-xl font-bold text-gray-900 dark:text-teal-600">
            Entry Count:
          </h4>
          <span className="bg-blue-100 text-blue-800 font-semibold mr-2 p-1 rounded dark:bg-blue-200 dark:text-blue-800">
            {entries.length}
          </span>
          <Button
            type="button"
            onClick={() => {
              if (entries.length < tableData.length) {
                setEntries((prev) => prev.concat(tableData[prev.length]));
              }
            }}
            variant="primary"
          >
            Increment
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (pageSize > 0) {
                setEntries((prev) => prev.slice(0, prev.length - 1));
              }
            }}
            variant="danger"
          >
            Decrement
          </Button>
        </div>
      </div>
      <Table<LeagueEntry> columns={leagueTableColumns} data={pagedData()} />
      <div className="px-6">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          itemCount={entries.length}
        />
      </div>
    </div>
  );
}

export const Example = {
  args: {
    itemCount: 20,
    currentPage: 1,
    pageSize: 5,
  },
  render: () => <TableExample />,
} satisfies Story;
