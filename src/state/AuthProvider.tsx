import { EntityRoles, User } from '@/entities/auth';
import storage from '@/utils/storage';
import { useCallback, useMemo, useState } from 'react';
import AuthContext from './contexts/AuthContext';

interface Props {
  children: React.ReactNode;
}
const testUser = {
  isSuperuser: true,
  businessUnitRoles: [
    {
      business_unit: 'a',
      business_unit_name: 'BU A',
      default_region: 5,
      roles: [],
    },
    {
      business_unit: 'b',
      business_unit_name: 'BU B',
      default_region: 5,
      roles: [],
    },
    {
      business_unit: 'c',
      business_unit_name: 'BU C',
      default_region: 5,
      roles: [],
    },
  ],
};
function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(testUser);

  const login = useCallback((authUser: User) => setUser(authUser), []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const isSuperuser = useMemo(() => !!user?.isSuperuser, [user]);

  const isLoggedIn = useMemo(() => !!user, [user]);

  const businessUnits = useMemo(() => {
    if (!user) return [];

    return user.businessUnitRoles.map((businessUnit) => ({
      id: businessUnit.business_unit,
      label: businessUnit.business_unit_name,
    }));
  }, [user]);

  const hasWriteAccess = useCallback(
    (roles: EntityRoles | EntityRoles[]) => {
      if (!user) return false;

      if (user.isSuperuser) return true;

      const currentBusinessUnitRoles = user.businessUnitRoles.find(
        (bu) => bu.business_unit === storage.businessUnit.getBusinessUnit()
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
      isSuperuser,
      hasWriteAccess,
      isLoggedIn,
      businessUnits,
    }),
    [
      user,
      login,
      logout,
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
