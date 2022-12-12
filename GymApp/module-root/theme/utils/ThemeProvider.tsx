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
    typography: {size: {S: 16, M: 20, L: 24, XL: 28, XXL: 32}}, 
    setCurrentTheme: () => {}
  }
);

const ThemeProvider = ({ children }: any) => {

  const [currentTheme, setCurrentTheme] = useState('green_black');

  const theme = {
    colors: 
      currentTheme === 'green_black' ? colors.green_black : 
      currentTheme === 'vine_red' ? colors.vine_red : 
      currentTheme === 'gold_black' ? colors.gold_black : 
      currentTheme === 'blue_sea' ? colors.blue_sea : 
      currentTheme === 'purple_black' ? colors.purple_black : 
      currentTheme === 'milk_coffee' ? colors.milk_coffee :
      currentTheme === 'dusk' ? colors.dusk :
      currentTheme === 'almost' ? colors.almost :
      currentTheme === 'relay' ? colors.relay :
      currentTheme === 'purple_white' ? colors.purple_white :
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
