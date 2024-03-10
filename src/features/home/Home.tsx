import ActiveSchedules from './ActiveSchedules';
import FilteredExceptions from './FilteredExceptions';

function Home() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <ActiveSchedules />
      <FilteredExceptions status="ACTIVE" />
      <FilteredExceptions status="UPCOMING" />
    </div>
  );
}

export default Home;
