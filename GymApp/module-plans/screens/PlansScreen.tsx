/**
 * Ekran główny planów treningowych
 */

import { StyleSheet, Text, View } from 'react-native';

const PlansScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MyPlans</Text>
    </View>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});