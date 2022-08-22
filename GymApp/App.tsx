/**
 * Główna funkcja aplikacji
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppNavigation from './AppNavigation';
import { AuthProvider } from './shared/state/AuthContext';
import ThemeProvider from './theme/utils/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.appContainer}>

        <StatusBar style="auto" />

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
    paddingTop: 30,
  }
});
