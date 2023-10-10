import { Meta, StoryObj } from '@storybook/react';

import Switch from '.';

const meta = {
  component: Switch,
  title: 'Input/Switch',
  tags: ['autodocs'],
  args: { label: 'Switch' },
} satisfies Meta<typeof Switch>;
export default meta;

type Story = StoryObj<typeof meta>;

function Template(args: React.ComponentProps<typeof Switch>) {
  return <Switch {...args} />;
}

export const Red = {
  args: {
    label: 'Red',
    colour: 'red',
    isChecked: false,
    onChange: () => {},
  },
  render: (args) => <Template {...args} />,
} satisfies Story;

export const Disabled = {
  args: {
    label: 'Disabled',
    isChecked: true,
    disabled: true,
    onChange: () => {},
  },
  render: (args) => <Template {...args} />,
} satisfies Story;
