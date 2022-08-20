/**
 * Nawigacja w sekcji kreatora planów treningowych
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatorScreen from '../screens/CreatorScreen';

/** parametry */
export type CreatorStackParams = {
  Creator: undefined;
};

/** navigator */
const CreatorStack = createNativeStackNavigator<CreatorStackParams>();

/** nawigacja */
const CreatorNavigation = () => {
  return (
    <CreatorStack.Navigator>

      <CreatorStack.Screen name="Creator" component={CreatorScreen} />

    </CreatorStack.Navigator>
  );
};

export default CreatorNavigation;