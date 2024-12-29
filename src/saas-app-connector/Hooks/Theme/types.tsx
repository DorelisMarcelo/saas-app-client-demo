import {ISaasAppTheme} from '../../types.tsx';

export interface IThemeContext {
    currentThemeKey?: string;
    activeTheme?: ISaasAppTheme;
    changeActiveTheme?: (themeKey: string) => void;
}
