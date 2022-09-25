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
import { useDispatch } from 'react-redux';
import { selectPlan } from '../redux/WorkoutReducer';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';

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
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * transformacja daty
   */
  const getDate = () => {
    const date = new Date(created);
    const out = date.toLocaleString('en-GB');    
    return out;
  }

  /**
   * wyranie treningu
   */
  const handleStartWorkout = () => {
    dispatch(selectPlan({plan: props}));
    navigation.push("Plan", {planKey: planKey});
  }

  return (
    <View style={[GlobalStyles.itemContainerRound, style.itemContainer]}>

      <Text style={[GlobalStyles.text, style.text]}>{planName}</Text>

      <Text style={[GlobalStyles.text, style.text]}>{getDate()}</Text>

      <OwnButton title="Show" onPress={handleStartWorkout} />

    </View>
  );
};

export default PlansListItem;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      backgroundColor: theme.colors.STEP_99,
      borderWidth: 1,
      borderColor: theme.colors.STEP_999,
    },
    text: {
      color: theme.colors.STEP_000,
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    },
  });