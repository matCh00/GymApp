/**
 * Provider stylów
 */

import { createContext, useState } from "react";
import { colors } from "./Colors";
import { typography } from "./Typography";
import { ThemeModel } from "../models/ThemeModel";
import { ColorModel } from "../models/ColorsModel";

export const ThemeContext = createContext<ThemeModel>(
  {
    colors: {SUCCESS: '', WARNING: '', ERROR: '', STEP_0000: '', STEP_000: '', STEP_00: '', STEP_0: '', STEP_1: '', STEP_2: '', STEP_3: '', 
    STEP_4: '', STEP_5: '', STEP_6: '', STEP_7: '',  STEP_8: '', STEP_9: '', STEP_99: '', STEP_999: '', STEP_9999: ''},
    typography: {size: {S: 9, M: 9, L: 9}, letterSpacing: {S: 9, M: 9, L: 9}}, 
    setCurrentTheme: () => {}
  }
);

const ThemeProvider = ({ children }: any) => {

  // TODO: STAN JAKO STRING BO MOŻE BYĆ WIELE MOTYWÓW, KIEDYŚ ZAPISAYWAĆ W BAZIE DANYCH
  const [currentTheme, setCurrentTheme] = useState('green_black');

  const theme = {
    colors: 
      currentTheme === 'green_black' ? colors.green_black : 
      currentTheme === 'vine_red' ? colors.vine_red : 
      currentTheme === 'gold_black' ? colors.gold_black : 
      currentTheme === 'blue_sea' ? colors.blue_sea : 
      currentTheme === 'blue_black' ? colors.blue_black : 
      currentTheme === 'white_purple' ? colors.white_purple : 
      currentTheme === 'gray_shades' ? colors.gray_shades :
      currentTheme === 'milk_coffee' ? colors.milk_coffee :
      colors.green_black,
    typography,
    setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
