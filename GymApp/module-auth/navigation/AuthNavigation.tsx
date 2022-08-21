/**
 * Nawigacja podczas rejestracji i logowania
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

/** 
 * parametry 
 */
export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

/** 
 * navigator 
 */
const AuthStack = createNativeStackNavigator<AuthStackParams>();

/** 
 * nawigacja 
 */
const AuthNavigation = () => {

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
  
  return (
    <AuthStack.Navigator initialRouteName="Login">

      <AuthStack.Screen name="Login" component={LoginScreen} />

      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerLeft: () => <></> }} />

    </AuthStack.Navigator>
  );
};

export default AuthNavigation;