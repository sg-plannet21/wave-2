import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '@/components/Feedback/Spinner/Spinner';
import useAuth from '@/state/hooks/useAuth';

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate('/auth/login', { replace: true });
  }, [navigate, logout]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
}

export default Logout;
