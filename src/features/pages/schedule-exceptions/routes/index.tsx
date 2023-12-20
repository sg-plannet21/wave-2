import { Navigate, Routes, Route } from 'react-router-dom';
import EditException from '../components/EditException';
import NewException from '../components/NewException';
import SectionsRedirect from '../../sections/components/SectionsRedirect';
import Exceptions from './Exceptions';

function ExceptionRoutes() {
  return (
    <Routes>
      <Route index element={<SectionsRedirect />} />
      <Route path=":sectionName">
        <Route index element={<Exceptions />} />
        <Route path="new" element={<NewException />} />
        <Route path=":id" element={<EditException />} />
        <Route path="*" element={<Navigate to="." />} />
      </Route>
    </Routes>
  );
}

export default ExceptionRoutes;
