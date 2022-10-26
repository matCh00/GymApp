/**
 * Nawigacja podczas korzystania z aplikacji
 */

import { NavigationContainer, DefaultTheme  } from "@react-navigation/native";
import { useContext } from "react";
import AuthNavigation from "./module-auth/navigation/AuthNavigation";
import RootNavigation from "./module-root/navigation/RootNavigation";
import { AuthModel } from "./module-auth/models/AuthModel";
import { AuthContext } from "./module-auth/context/AuthContext";
import useTheme from "./module-root/theme/hooks/useTheme";

/** 
 * nawigacja 
 */ 
const AppNavigation = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.STEP_3,
    },
  };

  /**
   * context uwierzytelniania
   */
  const {loggedIn} = useContext<AuthModel>(AuthContext)

  /** 
   * warunkowe renderowanie 
   */
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
    <NavigationContainer theme={customTheme}>

      {renderContent()}

    </NavigationContainer>
  );
};

export default AppNavigation;
