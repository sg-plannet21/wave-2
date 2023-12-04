import ContentLayout from '@/components/Layouts/ContentLayout';
import { useNavigate } from 'react-router-dom';
import MenuForm from './MenuForm';
import useCreateMenu from '../hooks/useCreateMenu';

function NewMenu() {
  const navigate = useNavigate();
  const createMenu = useCreateMenu();

  return (
    <ContentLayout title="New Menu">
      <MenuForm
        isSubmitting={createMenu.isLoading}
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log('new menu', values);
          navigate('..');
        }}
      />
    </ContentLayout>
  );
}

export default NewMenu;
