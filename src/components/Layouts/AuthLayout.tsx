import { ReactComponent as WaveLogo } from '@/assets/wave.svg';

interface Props {
  children: React.ReactNode;
  title: string;
}

function AuthLayout({ children, title }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 bg-gray-50 text:gray-900 dark:bg-slate-900 dark:text-white sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <WaveLogo className="h-24 w-auto fill-indigo-700 dark:fill-white" />
        </div>
        <h1 className="mt-3 text-center text-3xl font-semibold">{title}</h1>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
