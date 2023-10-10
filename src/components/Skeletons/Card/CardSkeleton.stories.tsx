import { Meta, StoryObj } from '@storybook/react';

import CardSkeleton from './CardSkeleton';

const meta = {
  component: CardSkeleton,
  title: 'Skeletons/Card',
  tags: ['autodocs'],
} satisfies Meta<typeof CardSkeleton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
