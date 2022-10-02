/**
 * Nawigacja podczas korzystania z aplikacji
 */

import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import AuthNavigation from "./module-auth/navigation/AuthNavigation";
import RootNavigation from "./module-root/navigation/RootNavigation";
import { AuthModel } from "./module-auth/models/AuthModel";
import { AuthContext } from "./module-auth/context/AuthContext";


/** 
 * nawigacja 
 */ 
const AppNavigation = () => {

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
    <NavigationContainer>

      {renderContent()}

    </NavigationContainer>
  );
};

export default AppNavigation;
