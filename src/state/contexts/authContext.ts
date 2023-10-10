import { EntityRoles, User } from '@/entities/auth';
import { createContext } from 'react';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isSuperuser: boolean;
  hasWriteAccess: (roles: EntityRoles | EntityRoles[]) => boolean;
  isLoggedIn: boolean;
  businessUnits: { id: string; label: string }[];
}

const initialState: AuthContextType = {
  user: null,
  login: () => undefined,
  logout: () => undefined,
  isSuperuser: false,
  hasWriteAccess: () => false,
  isLoggedIn: false,
  businessUnits: [],
};

const AuthContext = createContext<AuthContextType>(initialState);

export default AuthContext;
