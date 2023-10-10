import { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/Inputs/Button';
import ConfirmationDialog from './ConfirmationDialog';

const meta = {
  component: ConfirmationDialog,
  title: 'Feedback/ConfirmationDialog',
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmationDialog>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Danger = {
  args: {
    icon: 'danger',
    title: 'Confirmation',
    body: 'Hello World',
    confirmButton: <Button variant="danger">Confirm</Button>,
    triggerButton: <Button>Open</Button>,
  },
} satisfies Story;

export const Info = {
  args: {
    icon: 'info',
    title: 'Confirmation',
    body: 'Hello World',
    confirmButton: <Button>Confirm</Button>,
    triggerButton: <Button>Open</Button>,
  },
} satisfies Story;
