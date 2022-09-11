/**
 * Element listy planów treningowych
 */

 import { useNavigation } from '@react-navigation/native';
 import { NativeStackNavigationProp } from '@react-navigation/native-stack';
 import { StyleSheet, View, Text } from 'react-native';
 import useTheme from '../../theme/hooks/useTheme';
 import useThemedStyles from '../../theme/hooks/useThemeStyles';
 import { ThemeModel } from '../../theme/models/ThemeModel';
 import { PlansStackParams } from '../navigation/PlansNavigation';
 import OwnButton from '../../shared/components/OwnButton';
import { PlanModel } from '../utils/PlanModel';

const PlansListItem = (props: PlanModel) => {

  /**
   * props
   */
  const {planName, planKey, exercises, created} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<PlansStackParams>>();

  /**
   * transformacja daty
   */
  const getDate = () => {
    const date = new Date(created);
    const out = date.toLocaleString('en-GB');    
    return out;
  }

  return (
    <View style={style.itemContainer}>

      <Text style={style.text}>{planName}</Text>

      <Text style={style.text}>{getDate()}</Text>

      <OwnButton title="Show" onPress={() => {navigation.push("Plan", {planKey: planKey})}} />

    </View>
  );
};

export default PlansListItem;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      minWidth: '85%',
      alignItems: 'center',
      backgroundColor: theme.colors.STEP_99,
      paddingVertical: 10,
      borderRadius: 40,
      margin: 16,
      elevation: 10,
      borderWidth: 1,
      borderColor: theme.colors.STEP_999,
    },
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_000,
      fontWeight: '600',
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    },
  });