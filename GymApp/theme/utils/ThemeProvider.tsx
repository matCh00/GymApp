/**
 * Provider stylów
 */

import { createContext, useState } from "react";
import { colors } from "./Colors";
import { typography } from "./Typography";
import { ThemeModel } from "../models/ThemeModel";

export const ThemeContext = createContext<ThemeModel>(
  {
    colors: {SUCCESS: '', WARNING: '', ERROR: '', PRIMARY: '', SECONDARY: '', BACKGROUND_HEADER: '', BACKGROUND_SECOND_HEADER: '', 
      BACKGROUND_SCREEN_PRIMARY: '', BACKGROUND_SCREEN_SECONDARY: '', BACKGROUND_SCREEN_TERTIARY: '', TEXT_PRIMARY: '', 
      TEXT_SECONDARY: '', ACTIVE_TINT: '', ACTIVE_BACKGROUND: '', INACTIVE_TINT: '', INACTIVE_BACKGROUND: ''},
    typography: {size: {S: 9, M: 9, L: 9}, letterSpacing: {S: 9, M: 9, L: 9}}, 
    toggleTheme: ()=>{}, 
    isLightTheme: true
  }
);

const ThemeProvider = ({ children }: any) => {

  // TODO: STAN JAKO STRING BO MOŻE BYĆ WIELE MOTYWÓW, KIEDYŚ ZAPISAYWAĆ W BAZIE DANYCH
  const [isLightTheme, setLightTheme] = useState(true);
  const toggleTheme = () => setLightTheme((previousState) => !previousState);

  const theme = {
    colors: /*isLightTheme ? colors.light : colors.dark,*/ colors.green_black,
    typography,
    toggleTheme,
    isLightTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
