import ContentLayout from '@/components/Layouts/ContentLayout';
import { useNavigate } from 'react-router-dom';
import BusinessUnitForm from './BusinessUnitForm';
import useCreateBusinessUnit from '../hooks/useCreateBusinessUnit';

function NewBusinessUnit() {
  const navigate = useNavigate();
  const createBusinessUnit = useCreateBusinessUnit();

  return (
    <ContentLayout title="New Business Unit">
      <BusinessUnitForm
        isSubmitting={createBusinessUnit.isLoading}
        onSubmit={async (values) => {
          await createBusinessUnit.mutateAsync(values);
          navigate('..');
        }}
      />
    </ContentLayout>
  );
}

export default NewBusinessUnit;
