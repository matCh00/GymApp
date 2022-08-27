/**
 * Ekran logowania
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { StyleSheet, Text, Pressable, KeyboardAvoidingView, Switch } from 'react-native';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import OwnButton from '../../shared/components/OwnButton';
import OwnInput from '../../shared/components/OwnInput';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
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
    setEmail(emailInput);
    setLoggedIn(true);
  }

  return (
    <BackgroundTemplate>
      <KeyboardAvoidingView style={GlobalStyles.container}>

        <OwnInput placeholder='email' value={emailInput} onChangeText={text => setEmailInput(text)} />
        <OwnInput placeholder='password' value={passwordInput} onChangeText={text => setPasswordInput(text)} secureTextEntry />

        <OwnButton title='Login' onPress={handleLogin} />

        <OwnButton title="go to Register" onPress={() => {navigation.replace("Register")}} />
      
      </KeyboardAvoidingView>
    </BackgroundTemplate>
  );
};

export default LoginScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});