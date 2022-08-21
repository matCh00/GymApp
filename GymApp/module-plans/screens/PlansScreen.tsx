/**
 * Ekran główny planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { PlansStackParams } from '../navigation/PlansNavigation';

const PlansScreen = () => {

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<PlansStackParams>>();

  return (
    <View style={styles.container}>
      <Text>MyPlans</Text>
      <Pressable onPress={() => {navigation.push("Plan")}}>
        <Text>navigate to Plan</Text>
      </Pressable>
    </View>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});