import { useMemo, useReducer } from 'react';
import SelectedScheduleContext from './selectedScheduleContext';
import selectedScheduleReducer from './reducer';

interface Props {
  children: React.ReactNode;
}

function SelectedScheduleProvider({ children }: Props) {
  const [selectedSchedules, dispatch] = useReducer(selectedScheduleReducer, {
    isDefault: true,
    schedules: [],
  });

  const memoized = useMemo(
    () => ({ dispatch, ...selectedSchedules }),
    [selectedSchedules]
  );

  return (
    <SelectedScheduleContext.Provider value={memoized}>
      {children}
    </SelectedScheduleContext.Provider>
  );
}

export default SelectedScheduleProvider;
