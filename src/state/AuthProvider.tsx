import { EntityRoles, AuthUser } from '@/entities/auth';
import storage from '@/utils/storage';
import { useCallback, useMemo, useState } from 'react';
import jwtDecode from 'jwt-decode';
import refreshAccessToken from '@/features/auth/api/refreshToken';
import AuthContext from './contexts/AuthContext';

interface Props {
  children: React.ReactNode;
}

function getPersistedUser(): AuthUser | null {
  const token = storage.accessToken.getAccessToken();
  if (token) return jwtDecode(token) as AuthUser;
  return null;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<AuthUser | null>(getPersistedUser());

  const login = useCallback((authUser: AuthUser) => setUser(authUser), []);

  const refreshUser = useCallback(async (callback?: () => void) => {
    const refreshedUser = await refreshAccessToken();
    setUser(refreshedUser);
    if (callback) callback();
  }, []);

  const logout = useCallback(() => {
    storage.accessToken.removeAccessToken();
    setUser(null);
  }, []);

  const isSuperuser = useMemo(() => !!user?.is_wave_superuser, [user]);

  const isLoggedIn = useMemo(() => !!user, [user]);

  const businessUnits = useMemo(() => {
    if (!user) return [];

    return user.business_unit_roles.map((businessUnit) => ({
      id: businessUnit.business_unit,
      label: businessUnit.business_unit_name,
    }));
  }, [user]);

  const hasWriteAccess = useCallback(
    (roles: EntityRoles | EntityRoles[]) => {
      if (!user) return false;

      if (user.is_wave_superuser) return true;

      const currentBusinessUnitRoles = user.business_unit_roles.find(
        (bu) => bu.business_unit === storage.businessUnit.getBusinessUnit().id
      );
      if (!currentBusinessUnitRoles) return false;

      if (currentBusinessUnitRoles.roles.includes(EntityRoles.Administrator))
        return true;

      const requiredRoleList = Array.isArray(roles) ? roles : [roles];
      return requiredRoleList.some((requiredRole) =>
        currentBusinessUnitRoles.roles.includes(requiredRole)
      );
    },
    [user]
  );

  const memoedValues = useMemo(
    () => ({
      user,
      login,
      logout,
      refreshUser,
      isSuperuser,
      hasWriteAccess,
      isLoggedIn,
      businessUnits,
    }),
    [
      user,
      login,
      logout,
      refreshUser,
      isSuperuser,
      hasWriteAccess,
      isLoggedIn,
      businessUnits,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValues}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
