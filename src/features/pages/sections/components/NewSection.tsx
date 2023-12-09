import ContentLayout from '@/components/Layouts/ContentLayout';
import { useNavigate } from 'react-router-dom';
import useCreateSection from '../hooks/useCreateSection';
import SectionForm from './SectionForm';

function NewSection() {
  const navigate = useNavigate();
  const createSection = useCreateSection();

  return (
    <ContentLayout title="New Section">
      <SectionForm
        isSubmitting={createSection.isLoading}
        onSubmit={async (values) => {
          await createSection.mutateAsync(values);
          navigate('..');
        }}
      />
    </ContentLayout>
  );
}

export default NewSection;
