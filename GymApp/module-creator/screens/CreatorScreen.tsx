/**
 * Ekran główny kreatora planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CreatorStackParams } from '../navigation/CreatorNavigation';

const CreatorScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<CreatorStackParams>>();
  
  return (
    <View style={styles.container}>
      <Text>PlanCreator</Text>
      <Pressable onPress={() => {navigation.push("Modes")}}>
        <Text>navigate to Modes</Text>
      </Pressable>
    </View>
  );
};

export default CreatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});