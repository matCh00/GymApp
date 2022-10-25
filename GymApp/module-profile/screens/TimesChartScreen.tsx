/**
 * Ekran wykresu czasów trwania treningów
 */

import { StyleSheet } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import TimesChartMonth from '../components/TimesChartMonth';

const TimesChartScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>

      <TimesChartMonth />    

    </BackgroundTemplate>
  );
};

export default TimesChartScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});