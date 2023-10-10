import { Meta, StoryObj } from '@storybook/react';

import WaveTableSkeleton from './WaveTableSkeleton';

const meta = {
  component: WaveTableSkeleton,
  title: 'Skeletons/WaveTable',
  tags: ['autodocs'],
} satisfies Meta<typeof WaveTableSkeleton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
