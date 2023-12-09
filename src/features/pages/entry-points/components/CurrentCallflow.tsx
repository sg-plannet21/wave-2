import { ReactComponent as TimelineIcon } from '@/assets/timeline.svg';
import Drawer from '@/components/Feedback/Drawer';
import Form from '@/components/Form/Form';
import DateTimePickerField from '@/components/Form/RangePickerField/DateTimePickerField';
import Button from '@/components/Inputs/Button';
import useDisclosure from '@/hooks/useDisclosure';
import storage from '@/utils/storage';
import React from 'react';
import { useForm } from 'react-hook-form';

const HEIGHT = 600;

interface Props {
  id: string;
  name: string;
}

interface FormValues {
  date: Date;
}

function CurrentCallflow({ id, name }: Props) {
  const [iframeUrl, setIframeUrl] = React.useState<string | null>(null);
  const form = useForm<FormValues>();
  const { open, isOpen, close } = useDisclosure();

  function handleSubmit(values: FormValues) {
    const businessUnitId = storage.businessUnit.getBusinessUnit().id;

    const callflowUrl = import.meta.env.VITE_CALLFLOW_URL;

    const url = `${callflowUrl}/epcallflow?bu=${businessUnitId}&ep=${id}&start=${values.date.toJSON()}&height=${HEIGHT}`;

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
          <TimelineIcon className="w-5 h-5" />
        </button>
      </div>
      <Drawer
        title={`${name} - Current Call Flow.`}
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
            <DateTimePickerField name="date" label="Date" />
            <Button type="submit" size="sm" className="mb-1">
              Apply
            </Button>
          </div>
        </Form>
        {iframeUrl && (
          <iframe
            title={`${name} - Current Callflow`}
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

export default CurrentCallflow;
