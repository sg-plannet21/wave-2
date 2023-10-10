import { Meta, StoryObj } from '@storybook/react';

import WaveTablePageSkeleton from './WaveTablePageSkeleton';

const meta = {
  component: WaveTablePageSkeleton,
  title: 'Skeletons/WaveTablePage',
  tags: ['autodocs'],
} satisfies Meta<typeof WaveTablePageSkeleton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
