/**
 * Ekran kreatora planów treningowych - lista
 */

import { StyleSheet, Text, View } from 'react-native'
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';

const ListModeScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        <Text>ListModeScreen</Text>
      </View>
    </BackgroundTemplate>
  );
};

export default ListModeScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});