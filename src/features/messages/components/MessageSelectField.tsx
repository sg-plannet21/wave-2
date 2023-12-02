import SelectField, { PassthroughProps } from '@/components/Form/SelectField';
import React, { useMemo } from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import { orderBy } from 'lodash';
import AudioPlayerDialog from '@/components/Composite/Audio-Player-Dialog';
import { useFormContext } from 'react-hook-form';
import useMessages from '../hooks/useMessages';
import useMessagesLookup from '../hooks/useMessagesLookup';

interface PlayAudioProps {
  name?: string;
}

function PlayAudio({ name }: PlayAudioProps) {
  const messagesLookup = useMessagesLookup();
  const { watch } = useFormContext();

  if (!name || !messagesLookup) return null;

  const selectedMessage = watch(name);

  if (!selectedMessage) return null;

  const message = messagesLookup[selectedMessage];

  return (
    <AudioPlayerDialog
      trackList={{
        src: message.audio_file,
        name: message.prompt_name,
      }}
    />
  );
}

const MessageSelectField = React.forwardRef<
  HTMLSelectElement,
  PassthroughProps
>((props, ref) => {
  const { data } = useMessages();

  const options = useMemo(
    () => [
      {
        value: '',
        label: 'Select Prompt',
      },
      ...orderBy(data, ['prompt_name'], 'asc').map((message) => ({
        value: message.prompt_id,
        label: message.prompt_name,
      })),
    ],
    [data]
  );

  if (options)
    return (
      <div className="flex w-full gap-1 justify-between items-end">
        <div className="flex-1">
          <SelectField {...props} ref={ref} options={options} />
        </div>

        <PlayAudio name={props.name} />
      </div>
    );

  return <FormInputSkeleton />;
});

MessageSelectField.displayName = 'MessageSelectField';

export default MessageSelectField;
