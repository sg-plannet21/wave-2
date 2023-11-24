import { Navigate, Route, Routes } from 'react-router-dom';
import Users from './Users';

function UserRoutes() {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default UserRoutes;
