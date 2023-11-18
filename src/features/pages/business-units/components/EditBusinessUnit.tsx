import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import BusinessUnitForm from './BusinessUnitForm';
import useBusinessUnit from '../hooks/useBusinessUnit';
import useUpdateBusinessUnit from '../hooks/useUpdateBusinessUnit';

function EditBusinessUnit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const businessUnitQuery = useBusinessUnit(id as string);
  const updateBusinessUnit = useUpdateBusinessUnit(id as string);

  if (businessUnitQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title="Edit Business Unit">
      {businessUnitQuery.data && (
        <BusinessUnitForm
          isSubmitting={updateBusinessUnit.isLoading}
          onSubmit={async (values) => {
            await updateBusinessUnit.mutateAsync(values);
            navigate('..');
          }}
          defaultValues={businessUnitQuery.data}
        />
      )}
    </ContentLayout>
  );
}

export default EditBusinessUnit;
