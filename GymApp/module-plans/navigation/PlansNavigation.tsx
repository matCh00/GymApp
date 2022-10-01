/**
 * Nawigacja w sekcji planów treningowych
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useTheme from "../../module-root/theme/hooks/useTheme";
import PlanScreen from "../screens/PlanScreen";
import PlansScreen from '../screens/PlansScreen';
import WorkoutScreenActive from "../screens/WorkoutScreenActive";
import WorkoutScreenPassive from "../screens/WorkoutScreenPassive";

/** 
 * parametry 
 */
export type PlansStackParams = {
  Plans: undefined;
  Plan: {
    planKey: string;
  }
  ActiveWorkout: undefined;
  PassiveWorkout: undefined;
};

/** 
 * navigator 
 */
const PlansStack = createNativeStackNavigator<PlansStackParams>();

/** 
 * nawigacja 
 */
const PlansNavigation = () => {

  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <PlansStack.Navigator 
      initialRouteName="Plans"
      screenOptions={{headerStyle: {backgroundColor: theme.colors.STEP_0}, headerTintColor: theme.colors.STEP_999}}  
    >
      <PlansStack.Screen name="Plans" component={PlansScreen} />

      <PlansStack.Screen name="Plan" component={PlanScreen} />

      <PlansStack.Screen name="ActiveWorkout" component={WorkoutScreenActive} options={{title: "Active Workout"}} />

      <PlansStack.Screen name="PassiveWorkout" component={WorkoutScreenPassive} options={{title: "Passive Workout"}} />

    </PlansStack.Navigator>
  );
};

export default PlansNavigation;