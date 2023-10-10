import { Meta, StoryObj } from '@storybook/react';
import {
  Dessert,
  columns,
  desserts,
} from '@/components/Data-Display/Table/Table.stories';
import WaveTable from '.';
import { WaveTableProps } from './WaveTable';

const meta = {
  component: WaveTable,
  title: 'Composite/WaveTable',
  tags: ['autodocs'],
} satisfies Meta<typeof WaveTable<WaveTableProps<Dessert>>>;
export default meta;

type Story = StoryObj<WaveTableProps<Dessert>>;

export const Example = {
  args: {
    data: desserts,
    columns,
    sortColumn: {
      field: 'name',
      order: 'asc',
    },
    onSort: undefined,
  },
} satisfies Story;
