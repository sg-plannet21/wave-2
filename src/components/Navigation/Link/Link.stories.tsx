import { Meta, StoryObj } from '@storybook/react';
import {
  withRouter,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';

import Link from '.';

const meta = {
  component: Link,
  title: 'Navigation/Link',
  tags: ['autodocs'],
  args: { children: 'Wave Link' },
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { userId: '42' },
      },
      routing: { path: '/users/:userId' },
    }),
  },
} satisfies Meta<typeof Link>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: { to: '#' },
} satisfies Story;
