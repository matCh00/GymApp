/**
 * Model motywu
 */

import { ColorModel } from "./ColorsModel";
import { TypographyModel } from "./TypographyModel";

export interface ThemeModel {
  colors: ColorModel;
  typography: TypographyModel;
  setCurrentTheme: (value: string) => void | Promise<void>;
}