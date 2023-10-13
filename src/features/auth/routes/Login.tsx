import AuthLayout from '@/components/Layouts/AuthLayout';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <AuthLayout title="Login to Wave">
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
