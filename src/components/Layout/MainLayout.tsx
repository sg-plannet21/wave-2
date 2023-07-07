import { useEffect, useState } from 'react';
import { ReactComponent as DarkModeLogo } from '../../assets/dark_mode.svg';
import { ReactComponent as LightModeLogo } from '../../assets/light_mode.svg';
import { ReactComponent as MenuLogo } from '../../assets/menu.svg';
import { ReactComponent as PersonLogo } from '../../assets/person.svg';
import { ReactComponent as WaveLogo } from '../../assets/wave.svg';
import storage from '../../utils/storage';

interface Props {
  children: React.ReactNode;
}

function NavBar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function handleThemeToggle() {
    if (isDarkTheme) {
      storage.removeDarkTheme();
      window.document.documentElement.classList.remove('dark');
      setIsDarkTheme(false);
    } else {
      storage.setDarkTheme();
      window.document.documentElement.classList.add('dark');
      setIsDarkTheme(true);
    }
  }

  useEffect(() => {
    setIsDarkTheme(storage.getTheme() === 'dark');
  }, []);

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-slate-700 shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 dark:border-slate-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:dark:ring-slate-400 md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <MenuLogo
          className="fill-gray-400-500 dark:fill-white h-6 w-6"
          aria-hidden="true"
        />
      </button>
      <div className="flex-1 px-4 flex items-center justify-end space-x-2">
        <button
          onClick={handleThemeToggle}
          type="button"
          className="px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          {isDarkTheme ? (
            <LightModeLogo className="w-8 h-8 fill-gray-900 dark:fill-slate-100 hover:dark:fill-yellow-400 duration-500" />
          ) : (
            <DarkModeLogo className="w-8 h-8 fill-gray-900 dark:fill-slate-100 hover:fill-cyan-300 duration-500" />
          )}
        </button>
        <button
          type="button"
          className="px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <PersonLogo className="w-8 h-8 fill-gray-900 dark:fill-slate-100" />
        </button>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center">
      <WaveLogo className="h-8 w-auto fill-indigo-800 dark:fill-white" />
      <span className="text-xl font-semibold">Wave</span>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex items-center h-16 px-4 flex-shrink-0 bg-gray-200 dark:bg-slate-900">
          <Logo />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto border-r border-r-gray-400">
          Side Nav
        </div>
      </div>
    </div>
  );
}

function MainLayout({ children }: Props) {
  return (
    <div
      id="main-layout"
      className="flex h-screen bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-white transition-colors duration-1000"
    >
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <NavBar />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
