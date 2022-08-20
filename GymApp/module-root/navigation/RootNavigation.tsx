/**
 * Nawigacja w aplikacji po poprawnym zalogowaniu się
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlansNavigation from "../../module-plans/navigation/PlansNavigation";
import CreatorNavigation from "../../module-creator/navigation/CreatorNavigation";
import ProfileNavigation from "../../module-profile/navigation/ProfileNavigation";

/** parametry */ 
export type RootStackParams = {
  ProfileModule: undefined;
  PlansModule: undefined;
  CreatorModule: undefined;
};

/** navigator */
const RootStack = createBottomTabNavigator<RootStackParams>();

/** nawigacja */
const RootNavigation = () => {
  return (
    <RootStack.Navigator 
      initialRouteName="ProfileModule" 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
      }}>

      <RootStack.Screen 
        name="ProfileModule" 
        component={ProfileNavigation} 
        
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="home" color={color} size={size} />
          },
        }}
        />

      <RootStack.Screen 
        name="PlansModule" 
        component={PlansNavigation} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="home" color={color} size={size} />
          },
        }}
        />

      <RootStack.Screen 
        name="CreatorModule" 
        component={CreatorNavigation} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="home" color={color} size={size} />
          },
        }}
        />
        
    </RootStack.Navigator>
  );
};

export default RootNavigation;
