/**
 * Modele kolorów
 */

interface CommonModel {
  SUCCESS: string,
  WARNING: string,
  ERROR: string, 
}

export interface ColorModel extends CommonModel {
  PRIMARY: string, 
  SECONDARY: string, 
  BACKGROUND_HEADER: string, 
  BACKGROUND_SECOND_HEADER: string, 
  BACKGROUND_SCREEN_PRIMARY: string, 
  BACKGROUND_SCREEN_SECONDARY: string, 
  BACKGROUND_SCREEN_TERTIARY: string, 
  TEXT_PRIMARY: string, 
  TEXT_SECONDARY: string, 
  ACTIVE_TINT: string, 
  ACTIVE_BACKGROUND: string, 
  INACTIVE_TINT: string, 
  INACTIVE_BACKGROUND: string, 
}

export interface ColorsModel {
  green_black: ColorModel;
}
