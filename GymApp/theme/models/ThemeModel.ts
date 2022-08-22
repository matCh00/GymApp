/**
 * Model motywu
 */

import { ColorModel } from "./ColorsModel";
import { TypographyModel } from "./TypographyModel";

export interface ThemeModel {
  colors: ColorModel;
  typography: TypographyModel;
  isLightTheme: boolean;
  toggleTheme: (value: boolean) => void | Promise<void>;
}