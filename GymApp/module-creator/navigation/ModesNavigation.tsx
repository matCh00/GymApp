/**
 * Nawigacja w aplikacji po poprawnym zalogowaniu się
 */

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageModeScreen from '../screens/ImageModeScreen';
import ListModeScreen from '../screens/ListModeScreen';
import useTheme from '../../module-root/theme/hooks/useTheme';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';

/** 
 * parametry 
 */
export type ModesStackParams = {
  ImageMode: undefined;
  ListMode: undefined;
};

/** 
 * navigator 
 */
const ModesStack = createMaterialTopTabNavigator<ModesStackParams>();

/** 
 * nawigacja 
 */
const ModesNavigation = () => {

  /**
   * obliczenie wysokości headera
   */
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top); 

  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <ModesStack.Navigator
      initialRouteName="ListMode"
      backBehavior='none'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: theme.colors.STEP_1, marginTop: headerHeight, marginBottom: -40},
        tabBarIndicatorStyle: {backgroundColor: theme.colors.STEP_5},
        tabBarActiveTintColor: theme.colors.STEP_9,
        tabBarInactiveTintColor: theme.colors.STEP_5,
        tabBarItemStyle: {borderColor: theme.colors.STEP_0, borderWidth: 1}
      }}
    >
      <ModesStack.Screen
        name="ListMode"
        component={ListModeScreen}
        options={{
          tabBarPressColor: 'transparent',
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="table" color={color} size={24} />
            );
          },
        }}
      />

      <ModesStack.Screen
        name="ImageMode"
        component={ImageModeScreen}
        options={{
          tabBarPressColor: 'transparent',
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="image" color={color} size={24} />
            );
          },
        }}
      />

    </ModesStack.Navigator>
  );
};

export default ModesNavigation;
