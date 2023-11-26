import { Navigate, Routes, Route } from 'react-router-dom';
import EntryPoints from './EntryPoints';
import EditEntryPoint from '../components/EditEntryPoint';

function EntryPointRoutes() {
  return (
    <Routes>
      <Route index element={<EntryPoints />} />
      <Route path=":id" element={<EditEntryPoint />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default EntryPointRoutes;
