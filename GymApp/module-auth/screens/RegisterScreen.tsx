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
    <KeyboardAvoidingView style={style.container}>

      <OwnInput placeholder='email' value={emailInput} onChangeText={text => setEmailInput(text)} />
      <OwnInput placeholder='password' value={passwordInput} onChangeText={text => setPasswordInput(text)} secureTextEntry />

      <OwnButton title='Register' onPress={handleRegister} backgroundColor={theme.colors.SECONDARY} color={theme.colors.TEXT_PRIMARY} />

      <Pressable onPress={() => {navigation.replace("Login")}}>
        <Text>navigate to Login</Text>
      </Pressable>
      
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.BACKGROUND_SCREEN_PRIMARY,
    },
  });