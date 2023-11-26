import { Navigate, Routes, Route, Outlet } from 'react-router-dom';
import UnassignedQueues from './UnassignedQueues';
import UnassignedEntryPoints from './UnassignedEntryPoints';
import NavigationBar from '../components/NavigationBar';

function UnassignedEntitiesRoutes() {
  return (
    <Routes>
      <Route
        element={
          <>
            <NavigationBar />
            <br />
            <div className="-mt-5">
              <Outlet />
            </div>
          </>
        }
      >
        <Route path="queues" element={<UnassignedQueues />} />
        <Route path="entry-points" element={<UnassignedEntryPoints />} />
        <Route path="*" element={<Navigate to="queues" />} />
      </Route>
    </Routes>
  );
}

export default UnassignedEntitiesRoutes;
