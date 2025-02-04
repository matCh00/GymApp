/**
 * Główna funkcja aplikacji
 */

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import AppNavigation from './AppNavigation';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from './src/modules/root/theme/utils/ThemeProvider';
import { AuthProvider } from './src/modules/auth/context/AuthContext';
import OwnAlert from './src/shared/components/OwnAlert';
import { QualityProvider } from './src/shared/context/QualityContext';
import { OwnAlertVariantsEnum } from './src/shared/models/OwnAlertModel';
import { store } from './src/shared/redux/AppStore';

const statusBarInsideHeader = true;

export default function App() {

  const [alertOpened, setAlertOpened] = useState(false);

  /**
   * zapytanie czy wyjść z aplikacji
   */
  useEffect(() => {
    const handleBackButton = () => {
      setAlertOpened(true);
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackButton)
  }, [])

  return (
    <ThemeProvider>
      <View style={styles.appContainer}>

        {statusBarInsideHeader ? <StatusBar style="light" /> : null}

        <OwnAlert 
          visible={alertOpened}
          setVisible={setAlertOpened}
          header='Close app'
          question='Are you sure you want to close app?'
          func={() => {BackHandler.exitApp()}}
          variant={'YES_NO' as OwnAlertVariantsEnum}
        />
        
        <AuthProvider>
          <QualityProvider>
            <Provider store={store}>

              <SafeAreaProvider>
                <AppNavigation />
              </SafeAreaProvider>

            </Provider>
          </QualityProvider>
        </AuthProvider>
        
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  }
});
