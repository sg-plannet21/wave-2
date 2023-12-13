export type ScheduleType = 'default' | 'custom';

export interface SelectedScheduleType {
  schedules: Array<string>;
  isDefault: boolean;
}

interface AddSchedule {
  scheduleId: string;
  isDefault: boolean;
  type: 'ADD';
}

interface DeleteSchedule {
  scheduleId: string;
  type: 'DELETE';
}

interface ResetSchedules {
  type: 'RESET';
}

export type ScheduleAction = AddSchedule | DeleteSchedule | ResetSchedules;

function selectedScheduleReducer(
  state: SelectedScheduleType,
  action: ScheduleAction
) {
  switch (action.type) {
    case 'ADD':
      return {
        isDefault: action.isDefault,
        schedules: [...state.schedules, action.scheduleId],
      };
    case 'DELETE':
      return {
        ...state,
        schedules: state.schedules.filter(
          (schedule) => schedule !== action.scheduleId
        ),
      };
    case 'RESET':
      return { ...state, schedules: [] };
    default:
      return state;
  }
}

export default selectedScheduleReducer;
