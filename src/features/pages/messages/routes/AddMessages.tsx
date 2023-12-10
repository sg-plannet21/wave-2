import ContentLayout from '@/components/Layouts/ContentLayout';
import storage from '@/utils/storage';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import useBusinessUnit from '../../business-units/hooks/useBusinessUnit';
import useCreateMessage from '../hooks/useCreateMessage';
import MessageUploadForm from '../components/MessageUploadForm';

function AddMessagess() {
  const navigate = useNavigate();
  const currentBusinessUnitId = storage.businessUnit.getBusinessUnit().id;
  const { data: businessUnit } = useBusinessUnit(currentBusinessUnitId);

  const createMessage = useCreateMessage();

  if (!businessUnit) return <LoadingComponent />;

  return (
    <ContentLayout title="Add Messages">
      <MessageUploadForm
        onSubmit={(values) => {
          Promise.all(
            values.files.map((fileData) => {
              const payload = {
                file: fileData.file,
                name: fileData.name,
                region_id: businessUnit.default_region,
                business_unit: businessUnit.business_unit_id,
              };

              return createMessage.mutateAsync(payload);
            })
          ).finally(() => navigate('..'));
        }}
        isSubmitting={createMessage.isLoading}
      />
    </ContentLayout>
  );
}

export default AddMessagess;
