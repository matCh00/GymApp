/**
 * Ekran wykresu czasów trwania treningów
 */

import { StyleSheet, View, Text } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import TimesChartMonth from '../components/TimesChartMonth';

const TimesChartScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        <TimesChartMonth />    

      </View>
    </BackgroundTemplate>
  );
};

export default TimesChartScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});