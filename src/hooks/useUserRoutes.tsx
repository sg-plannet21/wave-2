import Spinner from '@/components/Feedback/Spinner/Spinner';
import AuthLayout from '@/components/Layouts/AuthLayout';
import MainLayout from '@/components/Layouts/MainLayout';
import Link from '@/components/Navigation/Link';
import AuthRoutes from '@/features/auth/routes';
import Login from '@/features/auth/routes/Login';
import Home from '@/features/home/Home';
import BusinessUnitRoutes from '@/features/pages/business-units/routes';
import useAuth from '@/state/hooks/useAuth';
import storage from '@/utils/storage';
import { Suspense, useMemo } from 'react';
import { Navigate, Outlet, RouteObject, useParams } from 'react-router-dom';
import RouteRoutes from '@/features/pages/routes/routes';
import UserRoutes from '@/features/pages/users/routes';
import EntryPointRoutes from '@/features/pages/entry-points/routes';
import UnassignedEntitiesRoutes from '@/features/pages/unassigned-entities/routes';
import MenuRoutes from '@/features/pages/menus/routes';
import QueueRoutes from '@/features/pages/queues/routes';
import MessageRoutes from '@/features/pages/messages/routes';

const commonAuthRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  { path: 'entry-points/*', element: <EntryPointRoutes /> },
  { path: 'queues/*', element: <QueueRoutes /> },
  { path: 'menus/*', element: <MenuRoutes /> },
  { path: 'messages/*', element: <MessageRoutes /> },
  { path: 'sections/*', element: <>Sections</> },
  { path: 'schedules/*', element: <>Schedules</> },
  { path: 'schedule-exceptions/*', element: <>Schedule Exceptions</> },
];

const superUserRoutes: RouteObject[] = [
  {
    path: 'unassigned-entities/*',
    element: <UnassignedEntitiesRoutes />,
  },
  { path: 'business-units/*', element: <BusinessUnitRoutes /> },
  { path: 'users/*', element: <UserRoutes /> },
  { path: 'routes/*', element: <RouteRoutes /> },
];

function BusinessUnit() {
  const { businessUnitSlug } = useParams();
  const { businessUnits } = useAuth();

  if (!businessUnits.length) {
    return (
      <AuthLayout title="Business Units Required">
        <p>Business Units Roles are required in order to login to Wave.</p>
        <p className="my-3">Please contact an administrator to proceed.</p>
        <Link to="/auth/login">Login</Link>
      </AuthLayout>
    );
  }

  if (
    businessUnitSlug &&
    businessUnits.findIndex(
      (bu) => bu.label === decodeURIComponent(businessUnitSlug)
    ) === -1
  ) {
    return <>Unauthorised</>;
  }

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

function useUserRoutes(): RouteObject[] {
  const { user, businessUnits } = useAuth();

  const routes = useMemo(() => {
    if (!user)
      return [
        { path: '/auth/login', element: <Login /> },
        { path: '*', element: <Navigate replace to="/auth/login" /> },
      ];

    let redirectTo = businessUnits[0].label;

    const storedBusinessUnit = storage.businessUnit.getBusinessUnit();
    if (storedBusinessUnit) {
      const validatedBusinessUnit = user.business_unit_roles.find(
        (bu) => bu.business_unit === storedBusinessUnit.id
      );
      if (validatedBusinessUnit)
        redirectTo = validatedBusinessUnit.business_unit_name;
    }

    const redirects: RouteObject[] = [
      { path: '/', element: <Navigate replace to="/app" /> },
      {
        path: '/app',
        element: <Navigate replace to={encodeURIComponent(redirectTo)} />,
      },
    ];

    const authRoutes = commonAuthRoutes;
    if (user.is_wave_superuser) authRoutes.push(...superUserRoutes);

    return [
      ...redirects,
      { path: '/auth/*', element: <AuthRoutes /> },
      {
        path: '/app/:businessUnitSlug',
        element: <BusinessUnit />,
        children: authRoutes,
      },
    ];
  }, [user, businessUnits]);

  return routes;
}

export default useUserRoutes;
