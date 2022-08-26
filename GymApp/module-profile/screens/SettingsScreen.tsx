/**
 * Ekran ustawień profilu
 */

import { StyleSheet, View } from 'react-native';
import OwnButton from '../../shared/components/OwnButton';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingsStackParams } from '../navigation/SettingsNavigation';

const SettingsScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<SettingsStackParams>>();

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        
        <OwnButton title='Themes' onPress={() => {navigation.replace("Themes")}} />

      </View>
    </BackgroundTemplate>
  );
};

export default SettingsScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});