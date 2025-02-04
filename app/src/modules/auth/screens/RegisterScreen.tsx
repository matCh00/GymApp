/**
 * Ekran rejestracji
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { AuthModel } from '../models/AuthModel';
import { AuthContext } from '../context/AuthContext';
import useTheme from '../../root/theme/hooks/useTheme';
import { registerWithEmailAndPassword } from '../../../firebase/Auth';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import OwnButton from '../../../shared/components/OwnButton';
import OwnInput from '../../../shared/components/OwnInput';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { AuthStackParams } from '../navigation/AuthNavigation';

const RegisterScreen = () => {

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * context uwierzytelniania
   */
  const {setEmail, setLoggedIn} = useContext<AuthModel>(AuthContext);

  /**
   * nawigcja
   */
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  /**
   * rejestracja
   */
  const handleRegister = () => {
    registerWithEmailAndPassword(emailInput, passwordInput).then(
      (email: any) => {
        setEmail(email);
        setLoggedIn(true);
        ToastAndroid.show('Welcome!', ToastAndroid.SHORT);
      }
    )
    .catch((error: any) => {
      let errorText = error.code;
      errorText = errorText.replace('auth/', '');
      const regEx = new RegExp('-', "g");
      errorText = errorText.replace(regEx, ' ');
      ToastAndroid.show("Error: " + errorText, ToastAndroid.SHORT);
      
      console.log(error.code);
    })
  }

  return (
    <BackgroundTemplate>
      <KeyboardAvoidingView style={{marginTop: 50, alignItems: 'center'}}>

        <OwnInput placeholder='email' value={emailInput} onChangeText={text => setEmailInput(text)} />
        <OwnInput placeholder='password' value={passwordInput} onChangeText={text => setPasswordInput(text)} secureTextEntry />

        <OwnButton title='Register' onPress={handleRegister} marginBottom={-20} />

        <OwnButton title="Back to Login" onPress={() => {navigation.replace("Login")}} />
        
      </KeyboardAvoidingView>
    </BackgroundTemplate>
  );
};

export default RegisterScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});