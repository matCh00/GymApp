/**
 * Nawigacja w aplikacji po poprawnym zalogowaniu się
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlansNavigation from "../../module-plans/navigation/PlansNavigation";
import CreatorNavigation from "../../module-creator/navigation/CreatorNavigation";
import ProfileNavigation from "../../module-profile/navigation/ProfileNavigation";
import { Text } from "react-native";
import useTheme from "../theme/hooks/useTheme";
import { useContext, useLayoutEffect } from "react";
import { AuthModel } from "../../module-auth/models/AuthModel";
import { AuthContext } from "../../module-auth/context/AuthContext";
import { getThemeDB } from "../../firebase/Database";

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
   * context uwierzytelniania
   */
  const {email} = useContext<AuthModel>(AuthContext);
  
  /**
   * motyw
   */
  const theme = useTheme();

  /**
   * załadowanie motywu użytkownika
   */
  useLayoutEffect(() => {
    getThemeDB(email)
      .then(
        (userTheme: string) => {
          theme.setCurrentTheme(userTheme);
        }
      )
  }, [])

  return (
    <RootStack.Navigator 
      initialRouteName="ProfileModule" 
      backBehavior='none'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: theme.colors.STEP_0, borderTopColor: theme.colors.STEP_00, marginTop: -10},
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
          tabBarLabel: ({ color }) => { 
            return <Text style={{color: color, fontSize: 12}}>Home</Text>
          },
        }}
      />

      <RootStack.Screen 
        name="PlansModule" 
        component={PlansNavigation} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="table-large" color={color} size={size} />
          },
          tabBarLabel: ({ color }) => { 
            return <Text style={{color: color, fontSize: 12}}>Plans</Text>
          },
        }}
      />

      <RootStack.Screen 
        name="CreatorModule" 
        component={CreatorNavigation} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="credit-card-plus-outline" color={color} size={size} />
          },
          tabBarLabel: ({ color }) => { 
            return <Text style={{color: color, fontSize: 12}}>Creator</Text>
          },
        }}
      />
        
    </RootStack.Navigator>
  );
};

export default RootNavigation;
