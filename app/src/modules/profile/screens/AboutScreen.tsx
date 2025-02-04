/**
 * Ekran ustawień profilu
 */

import { StyleSheet, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParams } from '../navigation/ProfileNavigation';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';
import useTheme from '../../root/theme/hooks/useTheme';

const AboutScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>();


  return (
    <BackgroundTemplate>

      <Text style={[GlobalStyles.text, style.textTopic, {marginTop: 50}]}>Mobile application for workouts management and monitoring</Text>

      <Text 
        style={[GlobalStyles.text, style.textAuthor, {marginBottom: '30%'}]}
        onPress={() => {
          Linking.openURL('https://github.com/matCh00');
        }}
      >Mateusz Chalik</Text>

      <Text style={[GlobalStyles.text, style.textHeader]}>Exercise demonstrations:</Text>

      <Text 
        style={[GlobalStyles.text, style.textSources]}
        onPress={() => {
          Linking.openURL('https://www.youtube.com/user/swoldiernation');
        }}
      >Steve Cook</Text>

      <Text 
        style={[GlobalStyles.text, style.textSources, {marginBottom: 100}]}
        onPress={() => {
          Linking.openURL('https://www.youtube.com/c/TerronBeckham');
        }}
      >Terron Beckham</Text>

    </BackgroundTemplate>
  );
};

export default AboutScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    textTopic: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.L,
      marginBottom: 20,
    },
    textAuthor: {
      color: theme.colors.STEP_99,
      fontSize: theme.typography.size.L,
      marginBottom: 10,
    },
    textHeader: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    },
    textSources: {
      color: theme.colors.STEP_99,
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    }
  });