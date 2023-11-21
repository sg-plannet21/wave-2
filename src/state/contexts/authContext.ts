import { EntityRoles, AuthUser } from '@/entities/auth';
import { createContext } from 'react';

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  refreshUser: (callback?:()=>void) => void;
  isSuperuser: boolean;
  hasWriteAccess: (roles: EntityRoles | EntityRoles[]) => boolean;
  isLoggedIn: boolean;
  businessUnits: { id: string; label: string }[];
}

const initialState: AuthContextType = {
  user: null,
  login: () => undefined,
  logout: () => undefined,
  refreshUser: () => undefined,
  isSuperuser: false,
  hasWriteAccess: () => false,
  isLoggedIn: false,
  businessUnits: [],
};

const AuthContext = createContext<AuthContextType>(initialState);

export default AuthContext;
