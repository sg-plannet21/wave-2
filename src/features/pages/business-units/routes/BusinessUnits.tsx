import ContentLayout from '@/components/Layouts/ContentLayout';
import { ReactComponent as PlusIcon } from '@/assets/plus.svg';
import Link from '@/components/Navigation/Link';
import BusinessUnitsTable from '../components/BusinessUnitsTable';

function BusinessUnits() {
  return (
    <ContentLayout title="Business Units">
      <div className="flex justify-end">
        <Link to="new" className="flex items-center">
          <PlusIcon className="w-6 h-6 fill-current" />
          <span>New Business Unit</span>{' '}
        </Link>
      </div>
      <div className="mt-4">
        <BusinessUnitsTable />
      </div>
    </ContentLayout>
  );
}

export default BusinessUnits;
