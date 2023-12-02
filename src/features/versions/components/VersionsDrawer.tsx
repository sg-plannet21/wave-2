import useDisclosure from '@/hooks/useDisclosure';
import { ReactComponent as VersionsIcon } from '@/assets/history.svg';
import Drawer from '@/components/Feedback/Drawer';
import Button from '@/components/Inputs/Button';
import Versions from './Versions';

function VersionsDrawer<Entry extends { [P in keyof Entry]: Entry[P] }>(
  props: React.ComponentProps<typeof Versions<Entry>>
) {
  const { open, isOpen, close } = useDisclosure();

  return (
    <>
      <div className="text-center">
        <button
          type="button"
          className="fill-emerald-600 dark:fill-emerald-400 transition-transform hover:scale-110"
          onClick={open}
        >
          <VersionsIcon className="w-5 h-5" />
        </button>
      </div>
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title="Versions"
        size="lg"
        renderFooter={() => (
          <Button variant="inverse" size="sm" onClick={close}>
            Cancel
          </Button>
        )}
      >
        <Versions {...props} />
      </Drawer>
    </>
  );
}

export default VersionsDrawer;
