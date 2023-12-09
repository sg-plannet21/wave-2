import { Navigate, Routes, Route } from 'react-router-dom';
import NewSection from '../components/NewSection';
import EditSection from '../components/EditSection';
import Sections from './Sections';

function SectionRoutes() {
  return (
    <Routes>
      <Route index element={<Sections />} />
      <Route path="new" element={<NewSection />} />
      <Route path=":id" element={<EditSection />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default SectionRoutes;
