/**
 * Modele typografii
 */

export interface SizesModel {
  S: number;
  M: number;
  L: number;
}

export interface TypographyModel {
  size: SizesModel;
  letterSpacing: SizesModel;
}
