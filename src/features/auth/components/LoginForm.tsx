import Form, { useZodForm } from '@/components/Form/Form';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

interface Props {
  onSuccess: () => void;
}

function LoginForm() {
  const form = useZodForm({ schema });
  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <InputField label="Username" {...form.register('username')} />
      <InputField label="Password" {...form.register('password')} />
      <Button className="w-full" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
