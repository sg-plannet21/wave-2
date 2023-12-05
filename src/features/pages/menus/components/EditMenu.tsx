import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import useMenu from '../hooks/useMenu';
import useUpdateMenu from '../hooks/useUpdateMenu';
import MenuForm from './MenuForm';

function EditMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const menuQuery = useMenu(id as string);
  const updateMenu = useUpdateMenu();

  if (menuQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title="Edit Business Unit">
      {menuQuery.data && (
        <MenuForm
          isSubmitting={updateMenu.isLoading}
          onSubmit={async (data) => {
            await updateMenu.mutateAsync({
              id: id as string,
              data: { ...data, menu_id: id as string },
            });
            navigate('..');
          }}
          defaultValues={menuQuery.data}
        />
      )}
    </ContentLayout>
  );
}

export default EditMenu;
