import { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import Search from '.';

const meta = {
  component: Search,
  title: 'Input/Search',
  tags: ['autodocs'],
} satisfies Meta<typeof Search>;
export default meta;

type Story = StoryObj<typeof meta>;

function SearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="dark:bg-slate-800 dark:text-white h-screen w-full p-4">
      <div className="w-full md:w-96">
        <Search
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export const Basic = {
  args: { value: '', onChange: () => {} },
  render: () => <SearchExample />,
} satisfies Story;
