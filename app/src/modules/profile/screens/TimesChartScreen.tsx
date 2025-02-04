/**
 * Ekran wykresu czasów trwania treningów
 */

import { StyleSheet } from 'react-native';
import TimesChartMonth from '../components/TimesChartMonth';
import useTheme from '../../root/theme/hooks/useTheme';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';

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