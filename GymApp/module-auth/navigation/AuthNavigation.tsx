/**
 * Nawigacja podczas rejestracji i logowania
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

/** parametry */
export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

/** navigator */
const AuthStack = createNativeStackNavigator<AuthStackParams>();

/** nawigacja */
const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>

      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />

    </AuthStack.Navigator>
  );
};

export default AuthNavigation;