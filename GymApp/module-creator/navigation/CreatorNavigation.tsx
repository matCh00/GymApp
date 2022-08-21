/**
 * Nawigacja w sekcji kreatora planów treningowych
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatorScreen from '../screens/CreatorScreen';
import ModesNavigation from "./ModesNavigation";

/** parametry */
export type CreatorStackParams = {
  Creator: undefined;
  Modes: undefined;
};

/** navigator */
const CreatorStack = createNativeStackNavigator<CreatorStackParams>();

/** nawigacja */
const CreatorNavigation = () => {
  return (
    <CreatorStack.Navigator initialRouteName="Creator">

      <CreatorStack.Screen name="Creator" component={CreatorScreen} />

      <CreatorStack.Screen name="Modes" component={ModesNavigation} />

    </CreatorStack.Navigator>
  );
};

export default CreatorNavigation;