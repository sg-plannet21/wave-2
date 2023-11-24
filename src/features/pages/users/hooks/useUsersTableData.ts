import { useMemo } from 'react';
import { EntityRoles } from '@/entities/auth';
import useUsers from './useUsers';
import useBusinessUnitRoles from './useBusinessUnitRoles';

export interface UserTableRecord {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  isSuperUser: boolean;
  roles: Array<EntityRoles>;
  currentBuRoles: Array<string>;
}

function useUsersTableData() {
  const { data, isLoading } = useUsers();
  const { data: businessUnitRoles } = useBusinessUnitRoles();

  const roles = useMemo(() => {
    if (!businessUnitRoles) return undefined;

    const promptsRole = businessUnitRoles[0].id;

    enum Roles {
      Prompts = promptsRole,
      EntryPoints = promptsRole + 1,
      Menus = promptsRole + 2,
      Queues = promptsRole + 3,
      Schedules = promptsRole + 4,
      Administrator = promptsRole + 5,
    }

    return Roles;
  }, [businessUnitRoles]);

  const users: Array<UserTableRecord> = useMemo(() => {
    if (!data || !roles) return [];

    //        .filter((user) => !user.is_cc_user)
    return data.map((user) => ({
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      isSuperUser: user.is_wave_superuser,
      roles: user.business_unit_roles
        .filter((role) => role >= roles.Prompts && role <= roles.Administrator)
        .map((roleId) => roles[roleId]) as EntityRoles[],
      currentBuRoles: user.current_business_unit_roles.map(
        (role) => roles[role]
      ),
    }));
  }, [data, roles]);

  return { data: users, isLoading, roles };
}

export default useUsersTableData;
