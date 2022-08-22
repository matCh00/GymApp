/**
 * Provider stylów
 */

import { createContext, useState } from "react";
import { colors } from "./Colors";
import { typography } from "./Typography";
import { ThemeModel } from "../models/ThemeModel";

export const ThemeContext = createContext<ThemeModel>(
  {
    colors: {BACKGROUND: '', TEXT: '', TEXT_SECONDARY: '', PRIMARY: '', SUCCESS: '', ERROR: ''},
    typography: {size: {S: 9, M: 9, L: 9}, letterSpacing: {S: 9, M: 9, L: 9}}, 
    toggleTheme: ()=>{}, 
    isLightTheme: true
  }
);

const ThemeProvider = ({ children }: any) => {
  const [isLightTheme, setLightTheme] = useState(true);
  const toggleTheme = () => setLightTheme((previousState) => !previousState);

  const theme = {
    colors: isLightTheme ? colors.light : colors.dark,
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
