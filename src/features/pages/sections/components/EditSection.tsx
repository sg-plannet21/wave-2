import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import useSection from '../hooks/useSection';
import useUpdateSection from '../hooks/useUpdateSection';
import SectionForm from './SectionForm';

function EditSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sectionQuery = useSection(id as string);
  const updateSection = useUpdateSection();

  if (sectionQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title="Edit Section">
      {sectionQuery.data && (
        <SectionForm
          isSubmitting={updateSection.isLoading}
          onSubmit={async (data) => {
            await updateSection.mutateAsync({
              id: id as string,
              data: { section_id: id as string, ...data },
            });
            navigate('..');
          }}
          defaultValues={sectionQuery.data}
        />
      )}
    </ContentLayout>
  );
}

export default EditSection;
