/**
 * Ekran ustawień profilu
 */

import { StyleSheet, Text, View } from 'react-native';
import OwnButton from '../../shared/components/OwnButton';
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
        
        <OwnButton title='dark green' onPress={() => {theme.setCurrentTheme('green_black')}} />
        <OwnButton title='dark vine' onPress={() => {theme.setCurrentTheme('vine_red')}} />
        <OwnButton title='dark blue' onPress={() => {theme.setCurrentTheme('blue_black')}} />
        <OwnButton title='golden wood' onPress={() => {theme.setCurrentTheme('gold_black')}} />
        <OwnButton title='light purple' onPress={() => {theme.setCurrentTheme('white_purple')}} />
        <OwnButton title='light blue' onPress={() => {theme.setCurrentTheme('blue_sea')}} />

      </View>
    </BackgroundTemplate>
  );
};

export default SettingsScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});