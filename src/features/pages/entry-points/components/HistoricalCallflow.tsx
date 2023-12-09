import { ReactComponent as MonitoringIcon } from '@/assets/monitoring.svg';
import Drawer from '@/components/Feedback/Drawer';
import Form from '@/components/Form/Form';
import DateTimeRangePickerField from '@/components/Form/RangePickerField/DateTimeRangePickerField';
import Button from '@/components/Inputs/Button';
import useDisclosure from '@/hooks/useDisclosure';
import storage from '@/utils/storage';
import React from 'react';
import { useForm } from 'react-hook-form';

const HEIGHT = 600;

interface Props {
  name: string;
}

interface FormValues {
  dateRange: Array<Date>;
}
// Previous Monday
const defaultStart = new Date();
defaultStart.setDate(
  defaultStart.getDate() - ((defaultStart.getDay() + 6) % 7)
);
defaultStart.setHours(9, 0, 0, 0);

const defaultEnd = new Date();
defaultEnd.setDate(defaultStart.getDate() + 5);
defaultEnd.setHours(17, 0, 0, 0);

function HistoricalCallflow({ name }: Props) {
  const [iframeUrl, setIframeUrl] = React.useState<string | null>(null);
  const form = useForm<FormValues>({
    defaultValues: { dateRange: [defaultStart, defaultEnd] },
  });
  const { open, isOpen, close } = useDisclosure();

  function handleSubmit(values: FormValues) {
    const businessUnitId = storage.businessUnit.getBusinessUnit().id;

    const callflowUrl = import.meta.env.VITE_CALLFLOW_URL;

    const startDate = values.dateRange[0].toJSON();
    const endDate = values.dateRange[1].toJSON();

    const url = `${callflowUrl}/ephistorical?bu=${businessUnitId}&ep=${name}&start=${startDate}&end=${endDate}&height=${HEIGHT}`;

    setIframeUrl(encodeURI(url));
  }

  return (
    <>
      <div className="text-center">
        <button
          aria-label="Open Callflow"
          type="button"
          className="fill-emerald-600 dark:fill-emerald-400 transition-transform hover:scale-110"
          onClick={open}
        >
          <MonitoringIcon className="w-5 h-5" />
        </button>
      </div>
      <Drawer
        title={`${name} - Historical Call Flow.`}
        isOpen={isOpen}
        onClose={close}
        size="lg"
        renderFooter={() => (
          <Button onClick={close} variant="inverse" size="sm">
            Close
          </Button>
        )}
      >
        <Form form={form} onSubmit={(values) => handleSubmit(values)}>
          <div className="max-w-md flex items-end w-full space-x-3">
            <DateTimeRangePickerField name="dateRange" label="Date Range" />
            <Button type="submit" size="sm" className="mb-1">
              Apply
            </Button>
          </div>
        </Form>
        {iframeUrl && (
          <iframe
            title={`${name} - Historical Callflow`}
            width="100%"
            height={`${HEIGHT}px`}
            src={iframeUrl}
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </Drawer>
    </>
  );
}

export default HistoricalCallflow;
