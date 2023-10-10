import { Meta, StoryObj } from '@storybook/react';
import useDisclosure from '@/hooks/useDisclosure';
import Button from '@/components/Inputs/Button';
import Drawer from './Drawer';

const meta = {
  component: Drawer,
  title: 'Feedback/Drawer',
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;
export default meta;

type Story = StoryObj<typeof meta>;

function Example() {
  const { close, open, isOpen } = useDisclosure();

  return (
    <>
      <Button onClick={open}>Open Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title="Sample Drawer"
        size="md"
        renderFooter={() => (
          <Button
            type="button"
            variant="inverse"
            size="sm"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={close}
          >
            Got it, thanks!
          </Button>
        )}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Your payment has been successfully submitted. We’ve sent you an
            email with all of the details of your order.
          </p>
        </div>
      </Drawer>
    </>
  );
}
export const Demo = {
  args: {
    title: 'Drawer',
    children: 'children',
    isOpen: false,
    onClose: () => {},
    renderFooter: () => 'Footer',
  },
  render: () => <Example />,
} satisfies Story;
