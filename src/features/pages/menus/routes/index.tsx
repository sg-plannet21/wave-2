import { Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './Routes';
import NewMenu from '../components/NewMenu';
import EditMenu from '../components/EditMenu';

function MenuRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="new" element={<NewMenu />} />
      <Route path=":id" element={<EditMenu />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default MenuRoutes;
