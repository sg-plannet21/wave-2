import Button from '@/components/Inputs/Button';
import { ReactComponent as ExpandDownIcon } from '@/assets/expand-down.svg';
import useAuth from '@/state/hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import storage from '@/utils/storage';
import Menu, {
  MenuButton,
  MenuItems,
  MenuItem,
} from '@/components/Navigation/Menu';

function BusinessUnitMenu() {
  const { businessUnits } = useAuth();
  const { businessUnitSlug } = useParams();

  useEffect(() => {
    if (businessUnitSlug) {
      const decodedLabel = decodeURIComponent(businessUnitSlug);
      const index = businessUnits.findIndex((bu) => bu.label === decodedLabel);
      if (index !== -1)
        storage.businessUnit.setBusinessUnit(businessUnits[index]);
    }
  }, [businessUnitSlug, businessUnits]);

  if (!businessUnitSlug) return null;

  return (
    <Menu>
      <MenuButton
        as={Button}
        // startIcon={<BusinessUnitIcon className="h-5 w-5 fill-current" />}
        endIcon={<ExpandDownIcon className="h-5 w-5 fill-current" />}
        className="w-full justify-between"
      >
        {decodeURIComponent(businessUnitSlug)}
      </MenuButton>
      <MenuItems>
        {businessUnits.map(({ id, label }) => (
          <MenuItem key={id} to={`/app/${encodeURIComponent(label)}`}>
            {label}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default BusinessUnitMenu;
