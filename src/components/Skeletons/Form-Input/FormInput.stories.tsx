import { Meta, StoryObj } from '@storybook/react';

import FormInput from './FormInput';

const meta = {
  component: FormInput,
  title: 'Skeletons/FormInput',
  tags: ['autodocs'],
} satisfies Meta<typeof FormInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
