/**
 * Nawigacja podczas rejestracji i logowania
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import useTheme from "../../root/theme/hooks/useTheme";

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
   * motyw
   */
  const theme = useTheme();
  
  return (
    <AuthStack.Navigator 
      initialRouteName="Login" 
      screenOptions={{headerStyle: {backgroundColor: theme.colors.STEP_0}, headerTintColor: theme.colors.STEP_999}} 
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />

      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerLeft: () => <></> }} />

    </AuthStack.Navigator>
  );
};

export default AuthNavigation;