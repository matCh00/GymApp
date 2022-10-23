/**
 * Główna funkcja aplikacji
 */

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import AppNavigation from './AppNavigation';
import { AuthProvider } from './module-auth/context/AuthContext';
import ThemeProvider from './module-root/theme/utils/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './shared/redux/AppStore';
import { QualityProvider } from './shared/context/QualityContext';
import OwnAlert from './shared/components/OwnAlert';
import { OwnAlertVariantsEnum } from './shared/models/OwnAlertModel';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
