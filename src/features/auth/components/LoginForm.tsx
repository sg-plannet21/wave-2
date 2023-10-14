import Form, { useZodForm } from '@/components/Form/Form';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import { z } from 'zod';
import useAuth from '@/state/hooks/useAuth';
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
        const user = await login(data);
        loadUser(user);
        onSuccess();
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
