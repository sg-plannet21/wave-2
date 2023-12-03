import ContentLayout from '@/components/Layouts/ContentLayout';
import { useNavigate } from 'react-router-dom';
import MenusForm from './MenusForm';
import useCreateMenu from '../hooks/useCreateMenu';

function NewMenu() {
  const navigate = useNavigate();
  const createMenu = useCreateMenu();

  return (
    <ContentLayout title="New Menu">
      <MenusForm
        isSubmitting={createMenu.isLoading}
                defaultValues={{welcome:'3',menu_name:'test'}}
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
