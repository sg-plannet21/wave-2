import { Meta, StoryObj } from '@storybook/react';

import DashboardComponent from './DashboardComponent';

const meta = {
  component: DashboardComponent,
  title: 'Skeletons/DashboardComponent',
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardComponent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
