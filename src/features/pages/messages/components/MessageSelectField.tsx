import SelectField, { PassthroughProps } from '@/components/Form/SelectField';
import React, { useMemo } from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import AudioPlayerDialog from '@/components/Composite/Audio-Player-Dialog';
import { useFormContext } from 'react-hook-form';
import { SelectOption } from '@/components/Inputs/Select';
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

  if (!message) return null;

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
  const { data, isLoading } = useMessages();

  const options: Array<SelectOption> = useMemo(
    () => [
      {
        value: '',
        label: 'Select Prompt',
      },
      ...(data ?? []).map((message) => ({
        value: message.prompt_id,
        label: message.prompt_name,
      })),
    ],
    [data]
  );

  if (isLoading) return <FormInputSkeleton />;

  return (
    <div className="flex w-full gap-2 justify-between items-end">
      <div className="flex-1">
        <SelectField {...props} ref={ref} options={options} />
      </div>

      <PlayAudio name={props.name} />
    </div>
  );
});

MessageSelectField.displayName = 'MessageSelectField';

export default MessageSelectField;
