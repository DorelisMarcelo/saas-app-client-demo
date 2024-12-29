import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import * as applicationConfig from '../application.configs.json';
import {
  SaasAppConnectorProvider,
  useSaasAppConnector,
} from './saas-app-connector';
import {
  ISaasAppConnector,
  ISaasAppConnectorProvider,
} from './saas-app-connector/types.tsx';
import {useTheme} from './saas-app-connector/Hooks';
import {IThemeContext} from './saas-app-connector/Hooks/Theme/types.tsx';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SaasAppConnectorProvider SaasAppConfigs={applicationConfig}>
      <Content />
    </SaasAppConnectorProvider>
  );
}

function Content(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {applicationConfigs}: ISaasAppConnector = useSaasAppConnector();
  const {activeTheme}: IThemeContext = useTheme();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={activeTheme?.values.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: activeTheme?.values.backgroundColor,
          }}>
          <Text style={{color:activeTheme?.values.fontColor}}>{applicationConfigs?.appName}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
