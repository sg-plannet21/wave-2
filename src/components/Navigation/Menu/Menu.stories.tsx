import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';
import { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/Inputs/Button';
import Menu, { MenuButton, MenuItems, MenuItem } from './Menu';

const meta = {
  component: Menu,
  title: 'Navigation/Menu',
  args: { children: 'Menu' },
  tags: ['autodocs'],
  decorators: [withRouter],
} satisfies Meta<typeof Menu>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Example = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { businessUnitId: 'a' },
        state: { fromPage: 'homePage' },
      },
      routing: {
        path: '/app/:businessUnitId',
        handle: 'Business Unit',
      },
    }),
  },
  render: () => (
    <Menu>
      <MenuButton as={Button}>Menu Button</MenuButton>
      <MenuItems>
        <MenuItem to="/app/a">Item 1</MenuItem>
        <MenuItem to="/app/b">Item 2</MenuItem>
        <MenuItem to="/app/c">Item 3</MenuItem>
      </MenuItems>
    </Menu>
  ),
} satisfies Story;
