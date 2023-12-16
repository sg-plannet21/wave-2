import { useContext } from 'react';
import SelectedScheduleContext from '../context/selectedScheduleContext';

function useSelectedSchedules() {
  return useContext(SelectedScheduleContext);
}

export default useSelectedSchedules;
