import useDisclosure from '@/hooks/useDisclosure';
import { ReactComponent as VersionsIcon } from '@/assets/history.svg';
import Drawer from '@/components/Feedback/Drawer';
import Button from '@/components/Inputs/Button';
import Versions from '@/features/versions/components/Versions';
import useScheduleVersionTableData from '../hooks/useScheduleVersionTableData';

interface Props {
  id: string;
}

function ScheduleVersionsTable({ id }: { id: string }) {
  const { name, versions, rows, isLoading } = useScheduleVersionTableData(id);

  return (
    <Versions
      name={name}
      versions={versions}
      rows={rows}
      isLoading={isLoading}
    />
  );
}
function ScheduleVersions({ id }: Props) {
  const { open, isOpen, close } = useDisclosure();

  return (
    <>
      <div className="text-center">
        <button
          aria-label="Show Versions"
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
        <ScheduleVersionsTable id={id} />
      </Drawer>
    </>
  );
}

export default ScheduleVersions;
