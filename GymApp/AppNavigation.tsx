/**
 * Nawigacja podczas korzystania z aplikacji.
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./module-auth/navigation/AuthNavigation";
import RootNavigation from "./module-root/navigation/RootNavigation";

/** parametry */
export type AppStackParams = {};

/** navigator */ 
const AppStack = createNativeStackNavigator<AppStackParams>();

/** nawigacja */ 
const AppNavigation = () => {

  const loggedIn = true;

  /** przejście pomiędzy uwierzytelnianiem a właściwą aplikacją */
  const renderContent = () => {
    if (loggedIn) {
      return (
        <RootNavigation />
      )
    }
    else {
      return (
        <AuthNavigation />
      )
    }
  }

  return (
    <NavigationContainer>

      {renderContent()}

    </NavigationContainer>
  );
};

export default AppNavigation;
