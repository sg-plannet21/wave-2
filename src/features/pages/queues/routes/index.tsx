import { Navigate, Routes, Route } from 'react-router-dom';
import Queues from './Queues';
import EditQueue from '../components/EditQueue';

function QueueRoutes() {
  return (
    <Routes>
      <Route index element={<Queues />} />
      <Route path=":id" element={<EditQueue />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default QueueRoutes;
