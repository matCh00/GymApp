/**
 * Ekran rejestracji
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AuthStackParams } from '../navigation/AuthNavigation';

const RegisterScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  return (
    <View>
      <Text>Register</Text>
      <Pressable onPress={() => {navigation.replace("Login")}}>
        <Text>navigate to Login</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});