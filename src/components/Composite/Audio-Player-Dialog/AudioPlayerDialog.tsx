import classNames from 'classnames';
import { ReactComponent as PlayIcon } from '@/assets/play.svg';
import { useCallback, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-h5-audio-player';
import useDisclosure from '@/hooks/useDisclosure';
import Button from '@/components/Inputs/Button';
import Dialog from '@/components/Feedback/Dialog';
import { DialogTitle } from '@/components/Feedback/Dialog/Dialog';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayerDialog.css'

type Track = {
  src: string;
  name: string;
};

export type AudioPlayerDialogProps = {
  trackList: Track | Track[];
  iconClassName?: string;
};

function AudioPlayerDialog({
  trackList,
  iconClassName = 'h-10 w-10',
}: AudioPlayerDialogProps) {
  const { isOpen, open, close } = useDisclosure();
  const [trackNumber, setTrackNumber] = useState(0);
  const multipleTracks = Array.isArray(trackList);

  const cancelButtonRef = useRef(null);

  const handleSkipForward = useCallback(() => {
    if (multipleTracks && trackNumber + 1 < trackList.length) {
      setTrackNumber((prevTrackNumber) => prevTrackNumber + 1);
    }
  }, [multipleTracks, trackNumber, trackList]);

  const handleSkipBackward = useCallback(() => {
    if (multipleTracks && trackNumber > 0) {
      setTrackNumber((prevTrackNumber) => prevTrackNumber - 1);
    }
  }, [multipleTracks, trackNumber]);

  const handleOnEnded = useCallback(() => {
    handleSkipForward();
  }, [handleSkipForward]);

  if (!trackList) return <h1>No audio to play</h1>;

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={classNames(
          'rounded-md border-none outline-2 outline-gray-400 hover:scale-110 duration-200 transition-all',
          {
            'fill-green-500 dark:fill-green-400': isOpen,
            'fill-indigo-500 dark:fill-indigo-400': !isOpen,
          }
        )}
      >
        <PlayIcon className={classNames(iconClassName)} />
      </button>
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="w-full">
          <div className="flex justify-between">
            <DialogTitle
              as="h3"
              className="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
            >
              {multipleTracks ? trackList[trackNumber].name : trackList.name}
            </DialogTitle>
            {multipleTracks && (
              <p className="text-sm text-gray-500 dark:text-gray-300">{`Audio ${
                trackNumber + 1
              } of ${trackList.length}`}</p>
            )}
          </div>
          <ReactAudioPlayer
            autoPlay
            src={multipleTracks ? trackList[trackNumber].src : trackList.src}
            showJumpControls={!multipleTracks}
            showSkipControls={multipleTracks}
            loop={false}
            onClickNext={handleSkipForward}
            onClickPrevious={handleSkipBackward}
            onEnded={handleOnEnded}
            customAdditionalControls={[]}
            // other props here
          />
          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              variant="primary"
              className="w-full inline-flex justify-center rounded-md border focus:ring-1 focus:ring-offset-1 focus:ring-gray-500 focus:dark:ring-gray-400 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={close}
              ref={cancelButtonRef}
            >
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AudioPlayerDialog;
