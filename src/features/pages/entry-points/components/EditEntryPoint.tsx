import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import useEntryPoint from '../hooks/useEntryPoint';
import EntryPointForm from './EntryPointsForm';
import useUpdateEntryPoint from '../hooks/useUpdateEntryPoint';

function EditEntryPoint() {
  const { id } = useParams();
  const entryPointQuery = useEntryPoint(id as string);
  const navigate = useNavigate();
  const updateEntryPoint = useUpdateEntryPoint();

  return (
    <ContentLayout title="Edit EntryPoint">
      {entryPointQuery.data && (
        <EntryPointForm
          isSubmitting={updateEntryPoint.isLoading}
          onSubmit={async (data) => {
            await updateEntryPoint.mutateAsync({
              id: id as string,
              data: { entry_point_id: id as string, ...data },
            });
            navigate('..');
          }}
          defaultValues={entryPointQuery.data}
        />
      )}
    </ContentLayout>
  );
}

export default EditEntryPoint;
