/**
 * Nawigacja w aplikacji po poprawnym zalogowaniu się
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlansNavigation from "../../module-plans/navigation/PlansNavigation";
import CreatorNavigation from "../../module-creator/navigation/CreatorNavigation";
import ProfileNavigation from "../../module-profile/navigation/ProfileNavigation";
import { Alert, BackHandler } from "react-native";
import { useEffect } from "react";
import useTheme from "../../theme/hooks/useTheme";

/** 
 * parametry 
 */ 
export type RootStackParams = {
  ProfileModule: undefined;
  PlansModule: undefined;
  CreatorModule: undefined;
};

/** 
 * navigator 
 */
const RootStack = createBottomTabNavigator<RootStackParams>();

/** 
 * nawigacja 
 */
const RootNavigation = () => {

  /**
   * zapytanie czy wyjść z aplikacji
   */
  useEffect(() => {
    const handleBackButton = () => {
      Alert.alert("Close", "Are you sure you want to close app?", [
        { text: "Cancel", onPress: () => null },
        { text: "Bye!", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackButton)
  }, [])
  
  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <RootStack.Navigator 
      initialRouteName="ProfileModule" 
      backBehavior='none'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: theme.colors.STEP_0, borderTopColor: theme.colors.STEP_00},
        tabBarActiveBackgroundColor: theme.colors.STEP_1,
        tabBarActiveTintColor: theme.colors.STEP_9,
        tabBarInactiveBackgroundColor: theme.colors.STEP_0,
        tabBarInactiveTintColor: theme.colors.STEP_4,
        tabBarItemStyle: {borderColor: theme.colors.STEP_00, borderWidth: 1}
      }}
    >
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
