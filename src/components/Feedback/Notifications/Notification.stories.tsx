import { Meta, StoryObj } from '@storybook/react';
import Notification from './Notification';

const meta = {
  component: Notification,
  title: 'Feedback/Notification',
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Info = {
  args: {
    notification: {
      title: 'Info',
      type: 'info',
      id: 1,
      message: 'This is the info notification',
    },
  },
} satisfies Story;

export const Success = {
  args: {
    notification: {
      title: 'Success',
      type: 'success',
      id: 2,
      message: 'This is the success notification',
    },
  },
} satisfies Story;

export const Error = {
  args: {
    notification: {
      title: 'Error',
      type: 'error',
      id: 3,
      message: 'This is the error notification',
    },
  },
} satisfies Story;

export const Warning = {
  args: {
    notification: {
      title: 'Warning',
      type: 'warning',
      id: 3,
      message: 'This is the warning notification',
    },
  },
} satisfies Story;

export const Timed = {
  args: {
    notification: {
      title: 'Timed',
      type: 'info',
      id: 3,
      message: 'This is a timed notification with a 5 second duration',
      duration: 5000,
    },
  },
} satisfies Story;
