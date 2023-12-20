import ContentLayout from '@/components/Layouts/ContentLayout';
import { useNavigate } from 'react-router-dom';
import useCreateException from '../hooks/useCreateException';
import ExceptionForm from './ExceptionForm';

function NewException() {
  const navigate = useNavigate();
  const createException = useCreateException();

  return (
    <ContentLayout title="New Exception">
      <ExceptionForm
        isSubmitting={createException.isLoading}
        onSubmit={async (values) => {
          await createException.mutateAsync(values);
          navigate('..');
        }}
      />
    </ContentLayout>
  );
}

export default NewException;
