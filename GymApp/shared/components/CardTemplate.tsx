/**
 * Szablon kafelka z okrągłymi rogami
 */

import Animated, { FadeOutUp, ZoomIn } from "react-native-reanimated";
import { StyleSheet, View } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { CardTemplateModel } from '../models/CardTemplateModel';
import { LinearGradient } from 'expo-linear-gradient';

const CardTemplate = (props: CardTemplateModel) => {

  /**
   * props
   */
  const {children, width, radius, color, padding, paddingBottom, paddingVertical, margin} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <Animated.View entering={ZoomIn} exiting={FadeOutUp}>

      <LinearGradient
        colors={[
          theme.colors.STEP_99,
          theme.colors.STEP_6,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          style.itemContainer,
          width ? {minWidth: width} : {minWidth: '90%'},
          radius ? {borderRadius: radius} : {borderRadius: 40},
          paddingBottom ? {paddingBottom: paddingBottom} : {paddingBottom: 10},
          paddingVertical ? {paddingVertical: paddingVertical} : {paddingVertical: 10},
          padding ? {padding: padding} : {padding: 0},
          margin ? {margin: margin} : {margin: 0},
          ]}
      >
        {children}
      
      </LinearGradient>
    </Animated.View>
  );
};

export default CardTemplate;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      alignItems: 'center',
      elevation: 20,
    }
  });