/**
 * Ekran kreatora planów treningowych - obrazek
 */

import { StyleSheet, Text, View } from 'react-native'
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import ImageMode from '../components/ImageMode';

const ImageModeScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        <ImageMode />
      </View>
    </BackgroundTemplate>
  );
};

export default ImageModeScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});