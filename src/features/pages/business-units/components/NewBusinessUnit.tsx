import ContentLayout from '@/components/Layouts/ContentLayout';
import BusinessUnitForm from './BusinessUnitForm';

function NewBusinessUnit() {
  return (
    <ContentLayout title="New Business Unit">
      <p>New Business Unit</p>
      <BusinessUnitForm />
    </ContentLayout>
  );
}

export default NewBusinessUnit;
