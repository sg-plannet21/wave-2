import ContentLayout from '@/components/Layouts/ContentLayout';
import { Link } from 'react-router-dom';

function UnassignedEntities() {
  return (
    <ContentLayout title="Unassigned Entities">
      <div className="mt-4">Table</div>
      <ul>
        <li>
          <Link to="new">New</Link>
        </li>
        <li>
          <Link to="123">Edit</Link>
        </li>
      </ul>
    </ContentLayout>
  );
}

export default UnassignedEntities;
