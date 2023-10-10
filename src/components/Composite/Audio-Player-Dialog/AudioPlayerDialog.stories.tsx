import { Meta, StoryObj } from '@storybook/react';
import AudioPlayerDialog from './AudioPlayerDialog';

const meta = {
  component: AudioPlayerDialog,
  title: 'Composite/AudioPlayerDialog',
  tags: ['autodocs'],
} satisfies Meta<typeof AudioPlayerDialog>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Demo = {
  args: {
    trackList: { src: '/Spring_Waltz.mp3', name: 'Spring Waltz - Chopin' },
  },
} satisfies Story;
