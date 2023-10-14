import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Logout from './Logout';

function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  );
}

export default AuthRoutes;
