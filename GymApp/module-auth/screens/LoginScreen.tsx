/**
 * Ekran logowania
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { StyleSheet, Text, Pressable, KeyboardAvoidingView } from 'react-native';
import OwnButton from '../../shared/components/OwnButton';
import OwnInput from '../../shared/components/OwnInput';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import { AuthStackParams } from '../navigation/AuthNavigation';

const LoginScreen = () => {

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  /**
   * context uwierzytelniania
   */
  const {setEmail, setLoggedIn} = useContext<AuthModel>(AuthContext);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  /**
   * logowanie
   */
  const handleLogin = () => {
    setEmail(emailInput);
    setLoggedIn(true);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>

      <OwnInput placeholder='email' value={emailInput} onChangeText={text => setEmailInput(text)} />
      <OwnInput placeholder='password' value={passwordInput} onChangeText={text => setPasswordInput(text)} secureTextEntry />

      <OwnButton title='Login' onPress={handleLogin} backgroundColor='#0782e9' color='white' />

      <Pressable onPress={() => {navigation.replace("Register")}}>
        <Text>navigate to Register</Text>
      </Pressable>
      
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});