import { Meta, StoryObj } from '@storybook/react';

import TableSkeleton from './TableSkeleton';

const meta = {
  component: TableSkeleton,
  title: 'Skeletons/Table',
  tags: ['autodocs'],
} satisfies Meta<typeof TableSkeleton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

