import { EntityRoles, User } from '@/entities/auth';
import storage from '@/utils/storage';
import { useCallback, useMemo, useState } from 'react';
import AuthContext from './contexts/authContext';

interface Props {
  children: React.ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((authUser: User) => setUser(authUser), []);

  const logout = useCallback(() => setUser(null), []);

  const isSuperuser = useCallback(() => !!user?.isSuperuser, [user]);

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
    () => ({ user, login, logout, isSuperuser, hasWriteAccess }),
    [user, login, logout, isSuperuser, hasWriteAccess]
  );

  return (
    <AuthContext.Provider value={memoedValues}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
