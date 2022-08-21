/**
 * Ekran wybranego planu treningowego
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { PlansStackParams } from '../navigation/PlansNavigation';

const PlanScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<PlansStackParams>>();

  return (
    <View>
      <Text>PlanScreen</Text>
      <Pressable onPress={() => {navigation.push("Workout")}}>
        <Text>navigate to Workout</Text>
      </Pressable>
    </View>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({});