/**
 * Nawigacja w sekcji planów treningowych
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useTheme from "../../theme/hooks/useTheme";
import PlanScreen from "../screens/PlanScreen";
import PlansScreen from '../screens/PlansScreen';
import WorkoutScreen from "../screens/WorkoutScreen";

/** 
 * parametry 
 */
export type PlansStackParams = {
  Plans: undefined;
  Plan: undefined;
  Workout: undefined;
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

      <PlansStack.Screen name="Workout" component={WorkoutScreen} />

    </PlansStack.Navigator>
  );
};

export default PlansNavigation;