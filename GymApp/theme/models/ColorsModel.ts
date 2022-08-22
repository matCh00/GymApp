/**
 * Modele kolorów
 */

interface CommonModel {
  PRIMARY: string;
  SUCCESS: string;
  ERROR: string;
}

export interface ColorModel extends CommonModel {
  BACKGROUND: string;
  TEXT: string;
  TEXT_SECONDARY: string;
}

export interface ColorsModel {
  light: ColorModel;
  dark: ColorModel;
}
