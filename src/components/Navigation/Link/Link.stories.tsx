import { Meta, StoryObj } from '@storybook/react';

import Link from '.';

const meta = {
  component: Link,
  title: 'Navigation/Link',
  tags: ['autodocs'],
  args: { children: 'Wave Link' },
} satisfies Meta<typeof Link>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: { to: '#' },
} satisfies Story;
