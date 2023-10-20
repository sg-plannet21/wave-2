import { Meta, StoryObj } from '@storybook/react';
import {
  withRouter,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';

import NewEntityLink from './NewEntityLink';

const meta = {
  component: NewEntityLink,
  title: 'Navigation/NewEntityLink',
  tags: ['autodocs'],
  args: { children: 'New Entity Link' },
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { userId: '42' },
      },
      routing: { path: '/users/:userId' },
    }),
  },
} satisfies Meta<typeof NewEntityLink>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: { to: '#' },
} satisfies Story;
