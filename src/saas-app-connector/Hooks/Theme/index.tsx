import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ISaasAppConfigs, ISaasAppTheme} from '../../types.tsx';
import {IThemeContext} from "./types.tsx";

export const ThemeContext = React.createContext({});

export const ThemeProvider = ({
  children,
  themes,
}: {
  children: React.ReactNode;
  themes: ISaasAppTheme[];
}) => {
  const [loading, setLoading] = useState(true);
  const [availableThemes] = useState<ISaasAppTheme[]>(themes);
  const [currentThemeKey, setCurrentThemeKey] = useState<string>(
    availableThemes[0].key,
  );
  const [activeTheme, setActiveTheme] = useState<ISaasAppTheme>(themes[0]);

  const changeActiveTheme = useCallback(
    (themeKey: string) => {
      const newTheme = availableThemes.find(theme => theme.key === themeKey);
      if (!newTheme) {
        return;
      }

      setActiveTheme(newTheme);
      setCurrentThemeKey(newTheme.key);
    },
    [setActiveTheme, setCurrentThemeKey],
  );

  const initThemeProvider = useCallback(async () => {
    changeActiveTheme(availableThemes[0].key);
  }, [changeActiveTheme, setLoading]);

  const contextValue: IThemeContext = {
    currentThemeKey,
    activeTheme,
    changeActiveTheme
  };

  useEffect(() => {
    initThemeProvider().then(r => setLoading(false));
  }, []);

  return (
    <ThemeContext.Provider value={contextValue}>
      {loading ? null : children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default useTheme;
