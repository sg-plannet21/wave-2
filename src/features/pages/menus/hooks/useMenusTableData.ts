import { useMemo } from 'react';
import useMenus from './useMenus';

export type MenuTableRecord = {
  id: string;
  name: string;
};

function useMenusTableData() {
  const { data: menus } = useMenus();

  const data: MenuTableRecord[] = useMemo(() => {
    if (!menus) return [];

    return menus.map((menu) => ({
      id: menu.menu_id,
      name: menu.menu_name,
    }));
  }, [menus]);

  return { data, isLoading: !menus };
}

export default useMenusTableData;
