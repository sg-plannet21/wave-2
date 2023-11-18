import { Meta, StoryObj } from '@storybook/react';
import LoadingComponent from './LoadingComponent';

const meta = {
  component: LoadingComponent,
  title: 'Feedback/LoadingComponent',
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingComponent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
