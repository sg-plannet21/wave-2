import AuthLayout from '@/components/Layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function Login() {
  const navigate = useNavigate();
  return (
    <AuthLayout title="Login to Wave">
      <LoginForm onSuccess={() => navigate('/')} />
    </AuthLayout>
  );
}

export default Login;
