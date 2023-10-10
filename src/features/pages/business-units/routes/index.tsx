import { Navigate, Routes, Route } from 'react-router-dom';
import BusinessUnits from './BusinessUnits';

function BusinessUnitRoutes() {
  return (
    <Routes>
      <Route index element={<BusinessUnits />} />
      <Route path=":businessUnitId" element={<>Business Unit Id</>} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default BusinessUnitRoutes;
