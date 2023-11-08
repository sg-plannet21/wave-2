import { Navigate, Routes, Route } from 'react-router-dom';
import BusinessUnits from './BusinessUnits';
import NewBusinessUnit from '../components/NewBusinessUnit';
import EditBusinessUnit from '../components/EditBusinessUnit';

function BusinessUnitRoutes() {
  return (
    <Routes>
      <Route index element={<BusinessUnits />} />
      <Route path="new" element={<NewBusinessUnit />} />
      <Route path=":id" element={<EditBusinessUnit />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default BusinessUnitRoutes;
