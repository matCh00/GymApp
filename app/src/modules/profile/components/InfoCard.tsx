/**
 * Kafelek na ekranie Profile 
 */

import { StyleSheet, Text } from 'react-native';
import { InfoCardModel } from '../models/InfoCardModel';
import useTheme from '../../root/theme/hooks/useTheme';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import CardTemplate from '../../../shared/components/CardTemplate';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';

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
    <CardTemplate radius={20} margin={10}>

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
      marginBottom: 5,
      marginLeft: 10,
      alignSelf: 'flex-start'
    },
    textContent: {
      color: theme.colors.STEP_0000,
      fontSize: theme.typography.size.M,
      marginBottom: 5,
    }
  });