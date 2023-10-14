import { Meta, StoryObj } from '@storybook/react';
import Spinner from '.';

const meta = {
  component: Spinner,
  title: 'Feedback/Spinner',
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Small = {
  args: {
    size: 'sm',
  },
} satisfies Story;

export const Medium = {
  args: {
    size: 'md',
  },
} satisfies Story;

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies Story;

export const Light = {
  args: {
    variant: 'light',
  },
} satisfies Story;
