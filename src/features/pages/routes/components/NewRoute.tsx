import ContentLayout from '@/components/Layouts/ContentLayout';
import { useNavigate } from 'react-router-dom';
import useExternalDestinationId from '../hooks/useExternalDestinationId';
import RouteForm from './RoutesForm';
import routeSchema from '../types/schema';
import useCreateRoute from '../hooks/useCreateRoute';

function NewRoute() {
  const navigate = useNavigate();
  const createRoute = useCreateRoute();
  const externalDestinationId = useExternalDestinationId();

  return (
    <ContentLayout title="New Route">
      <RouteForm
        schema={routeSchema(externalDestinationId)}
        isSubmitting={createRoute.isLoading}
        onSubmit={async (values) => {
          await createRoute.mutateAsync(values);
          navigate('..');
        }}
      />
    </ContentLayout>
  );
}

export default NewRoute;
