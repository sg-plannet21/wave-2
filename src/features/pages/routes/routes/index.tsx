import { Navigate, Routes, Route } from 'react-router-dom';
import NewRoute from '../components/NewRoute';
import EditRoute from '../components/EditRoute';
import HomePage from './Routes';

function PageRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="new" element={<NewRoute />} />
      <Route path=":id" element={<EditRoute />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default PageRoutes;
