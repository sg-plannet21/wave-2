import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  component: Button,
  title: 'Input/Button',
  args: {
    children: 'Click Me',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {} satisfies Story;

export const Primary = {
  args: {
    variant: 'primary',
  },
} satisfies Story;

export const Inverse = {
  args: {
    variant: 'inverse',
  },
} satisfies Story;

export const Danger = {
  args: {
    variant: 'danger',
  },
} satisfies Story;
