import React from 'react';
import {
  ScheduleAction,
  SelectedScheduleType,
} from './selectedScheduleReducer';

interface ContextType extends SelectedScheduleType {
  dispatch: React.Dispatch<ScheduleAction>;
}
const SelectedScheduleContext = React.createContext<ContextType>(
  {} as ContextType
);

export default SelectedScheduleContext;
