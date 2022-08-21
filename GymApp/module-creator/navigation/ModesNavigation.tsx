/**
 * Nawigacja w aplikacji po poprawnym zalogowaniu się
 */

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageModeScreen from '../screens/ImageModeScreen';
import ListModeScreen from '../screens/ListModeScreen';

/** parametry */
export type ModesStackParams = {
  ImageMode: undefined;
  ListMode: undefined;
};

/** navigator */
const ModesStack = createMaterialTopTabNavigator<ModesStackParams>();

/** nawigacja */
const ModesNavigation = () => {
  return (
    <ModesStack.Navigator
      initialRouteName="ImageMode"
      backBehavior='none'
      screenOptions={{
        tabBarShowLabel: false,
      }}
      >

      <ModesStack.Screen
        name="ImageMode"
        component={ImageModeScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="home" color={color} size={24} />
            );
          },
        }}
        />

      <ModesStack.Screen
        name="ListMode"
        component={ListModeScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="home" color={color} size={24} />
            );
          },
        }}
        />

    </ModesStack.Navigator>
  );
};

export default ModesNavigation;
