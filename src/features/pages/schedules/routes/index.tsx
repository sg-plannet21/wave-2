import { Navigate, Routes, Route } from 'react-router-dom';
import Schedules from './Schedules';
import EditSchedule from '../components/EditSchedule';
import NewSchedule from '../components/NewSchedule';

function ScheduleRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <h3 className="text-2xl text-emerald-400 font-semibold">
            Schedule Root (redirect)
          </h3>
        }
      />
      <Route path=":sectionId">
        <Route index element={<Schedules />} />
        <Route path="new" element={<NewSchedule />} />
        <Route path=":id" element={<EditSchedule />} />
        <Route path="*" element={<Navigate to="." />} />
      </Route>
    </Routes>
  );
}

export default ScheduleRoutes;
