/**
 * Kafelek na ekranie Profile 
 */

import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import { InfoCardModel } from '../utils/InfoCardModel';

const InfoCard = (props: InfoCardModel) => {

  /**
   * props
   */
  const {header, content} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={[GlobalStyles.itemContainerSharp, style.itemContainer]}>

      <Text style={[GlobalStyles.text, style.textHeader]}>{header}</Text>
      <Text style={[GlobalStyles.text, style.textContent]}>{content}</Text>

    </View>
  );
};

export default InfoCard;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      backgroundColor: theme.colors.STEP_99,
    },
    textHeader: {
      color: theme.colors.STEP_5,
      fontSize: theme.typography.size.L,
      marginBottom: 10,
      marginLeft: 10,
      alignSelf: 'flex-start'
    },
    textContent: {
      color: theme.colors.STEP_000,
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    }
  });