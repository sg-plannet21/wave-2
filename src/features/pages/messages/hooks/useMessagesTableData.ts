import { useMemo } from 'react';
import useMessages from './useMessages';

export type MessageTableRecord = {
  id: number;
  name: string;
  src: string;
};

function useMessagesTableData() {
  const { data: messages, isLoading, error } = useMessages();

  const data: MessageTableRecord[] = useMemo(() => {
    if (!messages) return [];

    return messages.map((message) => ({
      id: message.prompt_id,
      name: message.prompt_name,
      src: message.audio_file,
    }));
  }, [messages]);

  return { data, isLoading, error };
}

export default useMessagesTableData;
