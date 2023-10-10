import { Meta, StoryObj } from '@storybook/react';
import Table, { TableColumn, TableProps } from './Table';

export type Dessert = {
  id: string;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

const meta = {
  component: Table,
  title: 'Data-Display/Table',
  tags: ['autodocs'],
  excludeStories: ['desserts', 'columns'],
} satisfies Meta<typeof Table<TableProps<Dessert>>>;
export default meta;

type Story = StoryObj<TableProps<Dessert>>;

export const desserts: Dessert[] = [
  {
    id: '1',
    name: 'Frozen yoghurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    id: '2',
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
  },
  { id: '3', name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 },
  { id: '4', name: 'Cupcake', calories: 305, fat: 3, carbs: 67, protein: 4.3 },
  {
    id: '5',
    name: 'Gingerbread',
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
  },
];

export const columns: TableColumn<Dessert>[] = [
  {
    field: 'name',
    label: 'Dessert (100g serving)',
  },
  {
    field: 'calories',
    label: 'Calories',
  },
  { field: 'fat', label: 'Fat (g)' },
  { field: 'carbs', label: 'Carbs (g)' },
  { field: 'protein', label: 'Protein (g)' },
];

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
