import Spinner from '@/components/Elements/Spinner/Spinner';
import MainLayout from '@/components/Layout/MainLayout';
import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

function AuthApp() {
  // TODO: check if user is authenticated / route to login
  // if the user is not authenticated redirect to login
  // if (isSuperuser && user is not superuser) redirect to /

  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
}

function getProtectedRoutes(isSuperuser: boolean): RouteObject[] {
  const childRoutes: RouteObject[] = [
    { path: 'entry-points/*', element: <>Entry Points</> },
    { path: 'queues/*', element: <>Queues</> },
    { path: 'menus/*', element: <>Menus</> },
    { path: 'messages/*', element: <>Messages</> },
    { path: 'sections/*', element: <>Sections</> },
    { path: 'schedules/*', element: <>Schedules</> },
    { path: 'schedule-exceptions/*', element: <>Schedule Exceptions</> },
  ];

  const superUserRoutes: RouteObject[] = [
    {
      path: 'unassigned-entities/*',
      element: <>Unassigned Entities</>,
    },
    { path: 'business-units/*', element: <>Business Units</> },
    { path: 'users/*', element: <>Users</> },
    { path: 'routes/*', element: <>Routes</> },
  ];

  if (isSuperuser) childRoutes.push(...superUserRoutes);

  return [
    {
      path: '/app',
      element: <AuthApp />,
      children: childRoutes,
    },
  ];
}

export default getProtectedRoutes;
