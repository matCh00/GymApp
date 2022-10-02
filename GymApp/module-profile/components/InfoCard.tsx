/**
 * Kafelek na ekranie Profile 
 */

import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import { InfoCardModel } from '../models/InfoCardModel';
import CardTemplate from '../../shared/components/CardTemplate';

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
    <CardTemplate radius={10}>

      <Text style={[GlobalStyles.text, style.textHeader]}>{header}</Text>
      <Text style={[GlobalStyles.text, style.textContent]}>{content}</Text>

    </CardTemplate>
  );
};

export default InfoCard;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
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