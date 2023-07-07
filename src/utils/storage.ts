const storagePrefix = 'wave';

const storage = {
  getTheme: () => window.localStorage.getItem(`${storagePrefix}-theme`),
  setDarkTheme: () => {
    window.localStorage.setItem(`${storagePrefix}-theme`, 'dark');
  },
  removeDarkTheme: () => {
    window.localStorage.removeItem(`${storagePrefix}-theme`);
  },
};

export default storage;
