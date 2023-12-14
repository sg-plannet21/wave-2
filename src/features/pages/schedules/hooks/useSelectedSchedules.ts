import { useContext } from 'react';
import SelectedScheduleContext from '../context/selectedScheduleContext';

function useSelectedSchedule() {
  return useContext(SelectedScheduleContext);
}

export default useSelectedSchedule;
