/**
 * Główna funkcja aplikacji
 */

import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';
import AppNavigation from './AppNavigation';
import { AuthProvider } from './shared/state/AuthContext';
import ThemeProvider from './theme/utils/ThemeProvider';

const statusBarInsideHeader = false;

export default function App() {

  /**
   * zapytanie czy wyjść z aplikacji
   */
  useEffect(() => {
    const handleBackButton = () => {
      Alert.alert("Close", "Are you sure you want to close app?", [
        { text: "Cancel", onPress: () => null },
        { text: "Bye!", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackButton)
  }, [])

  return (
    <ThemeProvider>
      <View style={styles.appContainer}>

        {statusBarInsideHeader ? <StatusBar style="light" /> : null}
        
        <AuthProvider>
          <AppNavigation />
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
