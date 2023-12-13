import { Navigate, Routes, Route } from 'react-router-dom';
import Schedules from './Schedules';
import EditSchedule from '../components/EditSchedule';
import NewSchedule from '../components/NewSchedule';
import SectionsRedirect from '../../sections/components/SectionsRedirect';
import SelectedScheduleProvider from '../context/SelectedScheduleProvider';

function ScheduleRoutes() {
  return (
    <SelectedScheduleProvider>
      <Routes>
        <Route index element={<SectionsRedirect />} />
        <Route path=":sectionName">
          <Route index element={<Schedules />} />
          <Route path="new" element={<NewSchedule />} />
          <Route path=":id" element={<EditSchedule />} />
          <Route path="*" element={<Navigate to="." />} />
        </Route>
      </Routes>
    </SelectedScheduleProvider>
  );
}

export default ScheduleRoutes;
