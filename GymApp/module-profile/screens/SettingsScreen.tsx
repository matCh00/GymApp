/**
 * Ekran ustawień profilu
 */

import { StyleSheet, View } from 'react-native';
import OwnButton from '../../shared/components/OwnButton';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParams } from '../navigation/ProfileNavigation';

const SettingsScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

   /**
    * zapisanie motywu
    */
  const handleSave = () => {
    navigation.navigate("Profile")
  }

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        
        <OwnButton title='Save' onPress={handleSave} />

      </View>
    </BackgroundTemplate>
  );
};

export default SettingsScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});