/**
 * Szablon kafelka z okrągłymi rogami
 */

 import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import { ThemeModel } from '../../theme/models/ThemeModel';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { CardTemplateModel } from '../models/CardTemplateModel';

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
    <View style={[
      style.itemContainer,
      width ? {minWidth: width} : {minWidth: '90%'},
      radius ? {borderRadius: radius} : {borderRadius: 40},
      paddingBottom ? {paddingBottom: paddingBottom} : {paddingBottom: 10},
      paddingVertical ? {paddingVertical: paddingVertical} : {paddingVertical: 10},
      padding ? {padding: padding} : {padding: 0},
      margin ? {margin: margin} : {margin: 16},
      ]}
    >

      {children}

    </View>
  );
};

export default CardTemplate;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      alignItems: 'center',
      elevation: 20,  
      backgroundColor: theme.colors.STEP_99,
    }
  });