import { Navigate, Routes, Route } from 'react-router-dom';
import NewMenu from '../components/NewMenu';
import EditMenu from '../components/EditMenu';
import VersionTest from '../components/VersionTest';

function MenuRoutes() {
  return (
    <Routes>
      <Route index element={<VersionTest />} />
      <Route path="new" element={<NewMenu />} />
      <Route path=":id" element={<EditMenu />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default MenuRoutes;
