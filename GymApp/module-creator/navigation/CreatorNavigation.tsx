/**
 * Nawigacja w sekcji kreatora planów treningowych
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useTheme from "../../module-root/theme/hooks/useTheme";
import CreatorScreen from '../screens/CreatorScreen';
import ExerciseScreen from "../screens/ExerciseScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import ModesNavigation from "./ModesNavigation";

/** 
 * parametry 
 */
export type CreatorStackParams = {
  Creator: undefined;
  Modes: undefined;
  Exercises: {
    muscle: string;
  }
  Exercise: {
    pathName: string;
    muscleName: string;
    exerciseName: string;
  }
};

/** 
 * navigator 
 */
const CreatorStack = createNativeStackNavigator<CreatorStackParams>();

/** 
 * nawigacja 
 */
const CreatorNavigation = () => {

  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <CreatorStack.Navigator 
      initialRouteName="Creator"
      screenOptions={{headerStyle: {backgroundColor: theme.colors.STEP_0}, headerTintColor: theme.colors.STEP_999}}  
    >
      <CreatorStack.Screen name="Creator" component={CreatorScreen} />

      <CreatorStack.Screen name="Modes" component={ModesNavigation} />

      <CreatorStack.Screen name="Exercises" component={ExercisesScreen} />

      <CreatorStack.Screen name="Exercise" component={ExerciseScreen} />

    </CreatorStack.Navigator>
  );
};

export default CreatorNavigation;