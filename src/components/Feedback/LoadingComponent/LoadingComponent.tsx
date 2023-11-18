import Spinner from '../Spinner';

function LoadingComponent() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Spinner size="xl" />
    </div>
  );
}

export default LoadingComponent;
