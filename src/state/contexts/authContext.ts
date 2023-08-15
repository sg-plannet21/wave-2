import { EntityRoles, User } from '@/entities/auth';
import { createContext } from 'react';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isSuperuser: () => boolean;
  hasWriteAccess: (roles: EntityRoles | EntityRoles[]) => boolean;
}

const initialState: AuthContextType = {
  user: null,
  login: () => undefined,
  logout: () => undefined,
  isSuperuser: () => false,
  hasWriteAccess: () => false,
};

const AuthContext = createContext<AuthContextType>(initialState);

export default AuthContext;
