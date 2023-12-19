import { Meta, StoryObj } from '@storybook/react';

import Card from './Card';

const meta = {
  component: Card,
  title: 'Data-Display/Card',
  tags: ['autodocs'],
  args: {
    children: 'Hello World',
  },
} satisfies Meta<typeof Card>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: { title: 'Title', description: 'Description' },
} satisfies Story;
