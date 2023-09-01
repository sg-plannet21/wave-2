const storagePrefix = 'wave';

enum StorageKeys {
  ColourTheme = 'dark_theme',
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  BusinessUnit = 'business_unit',
}

function getItem(key: StorageKeys) {
  return JSON.parse(
    window.localStorage.getItem(`${storagePrefix}-${key}`) as string
  );
}

function setItem(key: StorageKeys, value: string | number | boolean) {
  window.localStorage.setItem(`${storagePrefix}-${key}`, JSON.stringify(value));
}

function removeItem(key: StorageKeys) {
  window.localStorage.removeItem(`${storagePrefix}-${key}`);
}

const storage = {
  theme: {
    isDarkMode: () => getItem(StorageKeys.ColourTheme),
    setDarkTheme: () => setItem(StorageKeys.ColourTheme, true),
    setLightTheme: () => setItem(StorageKeys.ColourTheme, false),
  },
  accessToken: {
    getAccessToken: () => getItem(StorageKeys.AccessToken),
    setAccessToken: (token: string) => setItem(StorageKeys.AccessToken, token),
    removeAccessToken: () => removeItem(StorageKeys.AccessToken),
  },
  refreshToken: {
    getRefreshToken: () => getItem(StorageKeys.RefreshToken),
    setRefreshToken: (refreshToken: string) =>
      setItem(StorageKeys.RefreshToken, refreshToken),
    removeRefreshToken: () => removeItem(StorageKeys.RefreshToken),
  },
  businessUnit: {
    getBusinessUnit: () => getItem(StorageKeys.BusinessUnit),
    setBusinessUnit: (businessUnit: string) =>
      setItem(StorageKeys.BusinessUnit, businessUnit),
    removeBusinessUnit: () => removeItem(StorageKeys.BusinessUnit),
  },
};
export default storage;
