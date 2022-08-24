/**
 * Ekran wykresu używanego obciążenia podczas ćwiczeń
 */

import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';

const WeightsChartScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        <Text>WeightsChartScreen</Text>
      </View>
    </BackgroundTemplate>
  );
};

export default WeightsChartScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});