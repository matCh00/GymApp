/**
 * Szablon kafelka z okrągłymi rogami
 */

import Animated, { FadeOutUp, ZoomIn } from "react-native-reanimated";
import { StyleSheet, View } from 'react-native';
import { CardTemplateModel } from '../models/CardTemplateModel';
import { LinearGradient } from 'expo-linear-gradient';
import useTheme from "../../modules/root/theme/hooks/useTheme";
import useThemedStyles from "../../modules/root/theme/hooks/useThemeStyles";
import { ThemeModel } from "../../modules/root/theme/models/ThemeModel";

const CardTemplate = (props: CardTemplateModel) => {

  /**
   * props
   */
  const {children, width, maxWidth, radius, color, padding, paddingBottom, paddingVertical, margin} = props;

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
          maxWidth ? {maxWidth: maxWidth} : {maxWidth: null},
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