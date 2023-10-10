import { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta = {
  component: Badge,
  title: 'Data-Display/Badge',
  args: { label: 'Hello World' },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    variant: 'primary',
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: 'secondary',
  },
} satisfies Story;

export const Success = {
  args: {
    variant: 'success',
  },
} satisfies Story;

export const Danger = {
  args: {
    variant: 'danger',
  },
} satisfies Story;

export const Medium = {
  args: {
        size:'md'
  },
} satisfies Story;

export const Large = {
  args: {
        size:'lg'
  },
} satisfies Story;

