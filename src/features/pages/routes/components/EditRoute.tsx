import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import useRoute from '../hooks/useRoute';
import useUpdateRoute from '../hooks/useUpdateRoute';
import RouteForm from './RoutesForm';
import useExternalDestinationId from '../hooks/useExternalDestinationId';
import routeSchema from '../types/schema';

function EditRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const routeQuery = useRoute(id as string);
  const updateRoute = useUpdateRoute();
  const externalDestinationId = useExternalDestinationId();

  if (routeQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title="Edit Route">
      {routeQuery.data && (
        <RouteForm
          schema={routeSchema(externalDestinationId)}
          isSubmitting={updateRoute.isLoading}
          onSubmit={async (data) => {
            await updateRoute.mutateAsync({
              id: id as string,
              data: { route_id: id as string, ...data },
            });
            navigate('..');
          }}
          defaultValues={routeQuery.data}
        />
      )}
    </ContentLayout>
  );
}

export default EditRoute;
