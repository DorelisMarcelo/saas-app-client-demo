import React, {useContext, useEffect, useState} from 'react';
import {ISaasAppConfigs, ISaasAppConnector} from './types.tsx';
import {ThemeProvider} from './Hooks';

export const SaasAppConnectorContext = React.createContext({});

export const SaasAppConnectorProvider = ({
  children,
  SaasAppConfigs,
}: {
  children: React.ReactNode;
  SaasAppConfigs: ISaasAppConfigs;
}) => {
  const [loading, setLoading] = useState(true);
  const [applicationConfigs] = useState<ISaasAppConfigs>(SaasAppConfigs);

  useEffect(() => {
    setLoading(false);
  });

  const contextValue:ISaasAppConnector = {
    applicationConfigs,
  };

  return (
    <SaasAppConnectorContext.Provider value={contextValue}>
      <ThemeProvider themes={applicationConfigs.themes}>
        {loading ? null : children}
      </ThemeProvider>
    </SaasAppConnectorContext.Provider>
  );
};

export const useSaasAppConnector = () => useContext(SaasAppConnectorContext);

export default useSaasAppConnector;
