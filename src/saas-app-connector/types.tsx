export interface ISaasAppConnector {
    applicationConfigs?: ISaasAppConfigs
}
export interface ISaasAppConfigs {
    appName: string;
    themes: ISaasAppTheme[];
}

export interface ISaasAppTheme {
    key: string,
    values: IThemeValues;
}

export interface IThemeValues {
    [key: string]: string | undefined;
}
