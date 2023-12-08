import { Navigate, Routes, Route } from 'react-router-dom';
import EditMessage from '../components/EditMessage';
import Messages from './Messages';
import MessageUploadForm from '../components/MessageUploadForm';

function MessageRoutes() {
  return (
    <Routes>
      <Route index element={<Messages />} />
      <Route path="new" element={<MessageUploadForm />} />
      <Route path=":id" element={<EditMessage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}

export default MessageRoutes;
