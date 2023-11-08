import { useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import BusinessUnitForm from './BusinessUnitForm';
import useBusinessUnit from '../hooks/useBusinessUnit';

function EditBusinessUnit() {
  const { id } = useParams();
  const businessUnitQuery = useBusinessUnit(id as string);

  return (
    <ContentLayout title="Edit Business Unit">
      <p>Edit Business Unit Form - {id}</p>
      <BusinessUnitForm
        // eslint-disable-next-line no-console
        onSubmit={(values) => console.log('on submit', values)}
        defaultValues={businessUnitQuery.data}
      />
    </ContentLayout>
  );
}

export default EditBusinessUnit;
