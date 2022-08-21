/**
 * Główna funkcja aplikacji
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppNavigation from './AppNavigation';
import { AuthProvider } from './shared/state/AuthContext';

export default function App() {
  
  return (
    <View style={styles.appContainer}>

      <StatusBar style="auto" />

      {/** dostęp do uwierzytelniania w całej aplikacji */}
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
      
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 30
  }
});
