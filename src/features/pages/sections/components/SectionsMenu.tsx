import Button from '@/components/Inputs/Button';
import { ReactComponent as ExpandDownIcon } from '@/assets/expand-down.svg';
import { ReactComponent as SectionIcon } from '@/assets/section.svg';
import Menu, {
  MenuButton,
  MenuItems,
  MenuItem,
} from '@/components/Navigation/Menu';
import { useParams } from 'react-router-dom';
import useSections from '../hooks/useSections';

function SectionMenu() {
  const { data: sections } = useSections();
  const { sectionName } = useParams();

  if (!sections || !sections.length) return null;

  return (
    <Menu>
      <MenuButton
        as={Button}
        startIcon={<SectionIcon className="h-5 w-5 fill-current" />}
        endIcon={<ExpandDownIcon className="h-5 w-5 fill-current" />}
        className="w-full justify-between h-11"
      >
        {decodeURIComponent(sectionName as string)}
      </MenuButton>
      <MenuItems location="right">
        {sections.map(({ section_id, section }) => (
          <MenuItem key={section_id} to={`../${encodeURIComponent(section)}`}>
            {section}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default SectionMenu;
