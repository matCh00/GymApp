/**
 * Ekran logowania
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AuthStackParams } from '../navigation/AuthNavigation';

const LoginScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  return (
    <View>
      <Text>Login</Text>
      <Pressable onPress={() => {navigation.replace("Register")}}>
        <Text>navigate to Register</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});