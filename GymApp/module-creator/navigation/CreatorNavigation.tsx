/**
 * Nawigacja w sekcji kreatora planów treningowych
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useTheme from "../../theme/hooks/useTheme";
import CreatorScreen from '../screens/CreatorScreen';
import ModesNavigation from "./ModesNavigation";

/** 
 * parametry 
 */
export type CreatorStackParams = {
  Creator: undefined;
  Modes: undefined;
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

    </CreatorStack.Navigator>
  );
};

export default CreatorNavigation;