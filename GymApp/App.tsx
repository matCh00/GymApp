/**
 * Główna funkcja aplikacji.
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './AppNavigation';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <StatusBar style="auto" />

      <AppNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20
  }
});
