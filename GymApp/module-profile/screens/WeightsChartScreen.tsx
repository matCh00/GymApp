/**
 * Ekran wykresu używanego obciążenia podczas ćwiczeń
 */

import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';

const WeightsChartScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={style.container}>
      <Text>WeightsChartScreen</Text>
    </View>
  );
};

export default WeightsChartScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.BACKGROUND_SCREEN_PRIMARY,
    },
  });