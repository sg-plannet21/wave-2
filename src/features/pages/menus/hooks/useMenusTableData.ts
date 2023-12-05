import { useMemo } from 'react';
import { get } from 'lodash';
import useMenus from './useMenus';
import useRoutesLookup from '../../routes/hooks/useRoutesLookup';

export const menuTableOptions: Array<{ key: keyof MenuOptions; label: string }> = [
  { key: 'no_input_route', label: 'NI' },
  { key: 'no_match_route', label: 'NM' },
  { key: 'opt0_route', label: '0' },
  { key: 'opt1_route', label: '1' },
  { key: 'opt2_route', label: '2' },
  { key: 'opt3_route', label: '3' },
  { key: 'opt4_route', label: '4' },
  { key: 'opt5_route', label: '5' },
  { key: 'opt6_route', label: '6' },
  { key: 'opt7_route', label: '7' },
  { key: 'opt8_route', label: '8' },
  { key: 'opt9_route', label: '9' },
  { key: 'asterisk_route', label: '*' },
  { key: 'hash_route', label: '#' },
];

type OptionType = string | null;

type MenuOptions = {
  no_input_route: OptionType;
  no_match_route: OptionType;
  opt0_route: OptionType;
  opt1_route: OptionType;
  opt2_route: OptionType;
  opt3_route: OptionType;
  opt4_route: OptionType;
  opt5_route: OptionType;
  opt6_route: OptionType;
  opt7_route: OptionType;
  opt8_route: OptionType;
  opt9_route: OptionType;
  asterisk_route: OptionType;
  hash_route: OptionType;
};

export type MenuTableRecord = {
  id: string;
  name: string;
} & MenuOptions;

function useMenusTableData() {
  const { data: menus } = useMenus();
  const routesLookup = useRoutesLookup();

  const data: MenuTableRecord[] = useMemo(() => {
    if (!menus || !routesLookup) return [];

    return menus.map((menu) => ({
      id: menu.menu_id,
      name: menu.menu_name,
      ...menuTableOptions.reduce((acc, option) => {
        acc[option.key] =
          menu[option.key] &&
          get(
            routesLookup[menu[option.key] as keyof MenuOptions],
            'route_name'
          );
        return acc;
      }, {} as MenuOptions),
    }));
  }, [menus, routesLookup]);

  return { data, isLoading: !menus || !routesLookup };
}

export default useMenusTableData;
