/**
 * Ekran ustawień profilu
 */

import { StyleSheet, Text, View, Switch } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';

const SettingsScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        <Text>SettingsScreen</Text>
        {/*sekcja na wybór motywu*/}
      </View>
    </BackgroundTemplate>
  );
};

export default SettingsScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});