/**
 * Ekran logowania
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { logInWithEmailAndPassword } from '../../firebase/Auth';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import OwnButton from '../../shared/components/OwnButton';
import OwnInput from '../../shared/components/OwnInput';
import { AuthModel } from '../models/AuthModel';
import { AuthContext } from '../context/AuthContext';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import { AuthStackParams } from '../navigation/AuthNavigation';

const LoginScreen = () => {

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
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  /**
   * logowanie
   */
  const handleLogin = () => {
    logInWithEmailAndPassword(emailInput, passwordInput).then(
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
      
      console.log(error);
    })
  }

  return (
    <BackgroundTemplate>
      <KeyboardAvoidingView style={{marginTop: 50, alignItems: 'center'}}>

        <OwnInput placeholder='email' value={emailInput} onChangeText={text => setEmailInput(text)} />
        <OwnInput placeholder='password' value={passwordInput} onChangeText={text => setPasswordInput(text)} secureTextEntry />

        <OwnButton title='Login' onPress={handleLogin} marginBottom={-20} />

        <OwnButton title="Create Account" onPress={() => {navigation.replace("Register")}} />
      
      </KeyboardAvoidingView>
    </BackgroundTemplate>
  );
};

export default LoginScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});