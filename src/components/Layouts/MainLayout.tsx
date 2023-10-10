import { ReactComponent as BusinessUnitIcon } from '@/assets/business-unit.svg';
import { ReactComponent as CloseIcon } from '@/assets/cross.svg';
import { ReactComponent as DarkModeIcon } from '@/assets/dark-mode.svg';
import { ReactComponent as EntryPointIcon } from '@/assets/entry-point.svg';
import { ReactComponent as LightModeIcon } from '@/assets/light-mode.svg';
import { ReactComponent as MenuIcon } from '@/assets/menu.svg';
import { ReactComponent as MessageIcon } from '@/assets/message.svg';
import { ReactComponent as NavMenuIcon } from '@/assets/nav-menu.svg';
import { ReactComponent as PersonIcon } from '@/assets/person.svg';
import { ReactComponent as QueueIcon } from '@/assets/queue.svg';
import { ReactComponent as RouteIcon } from '@/assets/route.svg';
import { ReactComponent as ScheduleExceptionIcon } from '@/assets/schedule-exception.svg';
import { ReactComponent as ScheduleIcon } from '@/assets/schedule.svg';
import { ReactComponent as SectionIcon } from '@/assets/section.svg';
import { ReactComponent as UnassignedEntitiesIcon } from '@/assets/unassigned-entities.svg';
import { ReactComponent as Users } from '@/assets/users.svg';
import { ReactComponent as WaveLogo } from '@/assets/wave.svg';
import useAuth from '@/state/hooks/useAuth';
import storage from '@/utils/storage';
import { Dialog, Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import BusinessUnitMenu from '../Composite/Business-Unit-Menu/BusinessUnitMenu';

interface Props {
  children: React.ReactNode;
}

interface SidebarItem {
  path: string;
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const buttonClasses =
  'group text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-500 rounded-lg text-sm p-2.5';
const iconClasses = 'w-8 h-8 fill-gray-900 dark:fill-gray-100';

const commonSidebarItems: SidebarItem[] = [
  {
    label: 'Entry Points',
    icon: EntryPointIcon,
    path: 'entry-points',
  },
  { label: 'Menus', icon: MenuIcon, path: 'menus' },
  { label: 'Queues', icon: QueueIcon, path: 'queues' },
  { label: 'Messages', icon: MessageIcon, path: 'messages' },
  { label: 'Sections', icon: SectionIcon, path: 'sections' },
  { label: 'Schedules', icon: ScheduleIcon, path: 'schedules' },
  {
    label: 'Schedule Exceptions',
    icon: ScheduleExceptionIcon,
    path: 'schedule-exceptions',
  },
];

const superuserSidebarItems: SidebarItem[] = [
  {
    label: 'Unassigned Entities',
    icon: UnassignedEntitiesIcon,
    path: 'unassigned-entities',
  },
  {
    label: 'Business Units',
    icon: BusinessUnitIcon,
    path: 'business-units',
  },
  { label: 'Routes', icon: RouteIcon, path: 'routes' },
  { label: 'Users', icon: Users, path: 'users' },
];

function Logo() {
  return (
    <div className="flex items-center">
      <WaveLogo className="h-8 w-auto fill-indigo-800 dark:fill-white" />
      <span className="text-xl font-semibold dark:text-white">Wave</span>
    </div>
  );
}
function UserNavigation() {
  const { logout } = useAuth();

  const userNavigation = [{ label: 'Logout', to: '/login', onClick: logout }];
  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <Menu.Button className={buttonClasses}>
            <span className="sr-only">Open user menu</span>
            <PersonIcon className={classNames(iconClasses)} />
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black dark:ring-gray-500 ring-opacity-5 focus:outline-none"
            >
              {userNavigation.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <Link
                      onClick={item.onClick}
                      to={item.to}
                      className={classNames(
                        'block px-4 py-2 text-sm text-gray-700 dark:text-white',
                        { 'bg-gray-100 dark:bg-gray-600': active }
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

function SideNavigation() {
  const { isSuperuser } = useAuth();

  const navigation: SidebarItem[] = [];
  if (isSuperuser) navigation.push(...superuserSidebarItems);
  navigation.push(...commonSidebarItems);

  return (
    <>
      <BusinessUnitMenu />
      {navigation.map((item, index) => (
        <NavLink
          key={item.label}
          end={index === 0}
          to={item.path}
          className={({ isActive }) =>
            classNames(
              'group flex items-center p-2 text-base font-medium rounded-md',
              {
                'text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-emerald-200':
                  !isActive,
              },
              { 'text-indigo-600 dark:text-emerald-400': isActive }
            )
          }
        >
          <item.icon className="h-6 w-6 mr-2 fill-current group-hover:scale-125 transition-transform duration-100 group-hover:fill-none" />
          {item.label}
        </NavLink>
      ))}
    </>
  );
}
type MobileSideBarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileSideBar({
  isSidebarOpen,
  setIsSidebarOpen,
}: MobileSideBarProps) {
  return (
    <Transition show={isSidebarOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 md:hidden"
        onClose={setIsSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed flex inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-trangray-x-full"
            enterTo="trangray-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="trangray-x-0"
            leaveTo="-trangray-x-full"
          >
            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-50 dark:bg-gray-800">
              <Transition.Child
                as={React.Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800 dark:focus:ring-white"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <CloseIcon
                      className="h-6 w-6 fill-gray-800 dark:fill-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Logo />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  <SideNavigation />
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

interface NavBarProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBar({ setIsSidebarOpen }: NavBarProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function handleThemeToggle() {
    if (isDarkTheme) {
      storage.theme.setLightTheme();
      window.document.documentElement.classList.remove('dark');
      setIsDarkTheme(false);
    } else {
      storage.theme.setDarkTheme();
      window.document.documentElement.classList.add('dark');
      setIsDarkTheme(true);
    }
  }

  useEffect(() => {
    setIsDarkTheme(storage.theme.isDarkMode());
  }, []);

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="px-4 border-r border-gray-200 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:dark:ring-gray-400 md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <NavMenuIcon
          className="fill-gray-400-500 dark:fill-white h-6 w-6"
          aria-hidden="true"
        />
      </button>
      <div className="flex-1 px-4 flex items-center justify-end space-x-2">
        <button
          onClick={handleThemeToggle}
          type="button"
          className={classNames(buttonClasses)}
        >
          {isDarkTheme ? (
            <LightModeIcon
              className={classNames(
                iconClasses,
                'group-hover:dark:fill-yellow-400 duration-500'
              )}
            />
          ) : (
            <DarkModeIcon
              className={classNames(
                iconClasses,
                'group-hover:fill-cyan-300 duration-500'
              )}
            />
          )}
        </button>
        <UserNavigation />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex items-center h-16 px-4 flex-shrink-0 bg-gray-200 dark:bg-gray-900">
          <Logo />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto border-r border-r-gray-200 dark:border-r-gray-700">
          <nav className="flex-1 px-2 py-2 space-y-1 bg-gray-50/50 dark:bg-gray-800/50">
            <SideNavigation />
          </nav>
        </div>
      </div>
    </div>
  );
}

function MainLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      id="main-layout"
      className="flex h-screen transition-colors duration-500"
    >
      <MobileSideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <NavBar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
