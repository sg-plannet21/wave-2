import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import { z } from 'zod';
import useAuth from '@/state/hooks/useAuth';
import Form, { useZodForm } from '@/components/Form/Form';
import axios from 'axios';
import { useNotificationStore } from '@/state/notifications';
import login from '../api/login';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginValues = z.infer<typeof schema>;

interface Props {
  onSuccess: () => void;
}

function LoginForm({ onSuccess }: Props) {
  const form = useZodForm({ schema });
  const { login: loadUser } = useAuth();
  return (
    <Form<LoginValues>
      form={form}
      onSubmit={async (data) => {
        try {
          const user = await login(data);
          loadUser(user);
          onSuccess();
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.data.errors) {
              error.response.data.errors.forEach(
                (err: { title: string; detail: string; status: number }) =>
                  useNotificationStore.getState().addNotification({
                    title: 'Login Error',
                    message: err.detail,
                    type: 'error',
                  })
              );
            } else {
              useNotificationStore.getState().addNotification({
                title: 'Login Error',
                message: 'An error was encountered while logging in',
                type: 'error',
              });
            }
          }
        }
      }}
    >
      <InputField label="Username" {...form.register('username')} />
      <InputField
        label="Password"
        type="password"
        {...form.register('password')}
      />
      <Button className="w-full" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
