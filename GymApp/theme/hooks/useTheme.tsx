/**
 * Hook contextu motywu
 */

import { useContext } from "react";
import { ThemeContext } from "../utils/ThemeProvider";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
