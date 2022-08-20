/**
 * Nawigacja w sekcji planów treningowych
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlansScreen from '../screens/PlansScreen';

/** parametry */
export type PlansStackParams = {
  Plans: undefined;
};

/** navigator */
const PlansStack = createNativeStackNavigator<PlansStackParams>();

/** nawigacja */
const PlansNavigation = () => {
  return (
    <PlansStack.Navigator>

      <PlansStack.Screen name="Plans" component={PlansScreen} />

    </PlansStack.Navigator>
  );
};

export default PlansNavigation;