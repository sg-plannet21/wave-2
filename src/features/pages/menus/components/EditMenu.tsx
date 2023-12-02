import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import useMenu from '../hooks/useMenu';
import useUpdateMenu from '../hooks/useUpdateMenu';
import MenusForm from './MenusForm';

function EditMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const menuQuery = useMenu(id as string);
  const updateMenu = useUpdateMenu();

  if (menuQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title="Edit Business Unit">
      {menuQuery.data && (
        <MenusForm
          isSubmitting={updateMenu.isLoading}
          onSubmit={async (data) => {
            // eslint-disable-next-line no-console
            console.log('edit menu', data);
            navigate('..');
          }}
          defaultValues={{ ...menuQuery.data, welcome: '' }}
        />
      )}
    </ContentLayout>
  );
}

export default EditMenu;
