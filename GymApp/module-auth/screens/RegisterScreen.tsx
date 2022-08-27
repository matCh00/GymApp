/**
 * Ekran rejestracji
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { StyleSheet, Text, Pressable, KeyboardAvoidingView, View, TextInput } from 'react-native';
import OwnButton from '../../shared/components/OwnButton';
import OwnInput from '../../shared/components/OwnInput';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { AuthStackParams } from '../navigation/AuthNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';

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
    setEmail(emailInput);
    setLoggedIn(true);
  }

  return (
    <BackgroundTemplate>
      <KeyboardAvoidingView style={GlobalStyles.container}>

        <OwnInput placeholder='email' value={emailInput} onChangeText={text => setEmailInput(text)} />
        <OwnInput placeholder='password' value={passwordInput} onChangeText={text => setPasswordInput(text)} secureTextEntry />

        <OwnButton title='Register' onPress={handleRegister} />

        <OwnButton title="go to Login" onPress={() => {navigation.replace("Login")}} />
        
      </KeyboardAvoidingView>
    </BackgroundTemplate>
  );
};

export default RegisterScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});