/**
 * Modele kolorów
 */

interface CommonModel {
  SUCCESS: string,
  WARNING: string,
  ERROR: string, 
}

export interface ColorModel extends CommonModel {
  STEP_0000: string,
  STEP_000: string,
  STEP_00: string,
  STEP_0: string,
  STEP_1: string,
  STEP_2: string,
  STEP_3: string,
  STEP_4: string,
  STEP_5: string,
  STEP_6: string,
  STEP_7: string,
  STEP_8: string,
  STEP_9: string,
  STEP_99: string,
  STEP_999: string,
  STEP_9999: string,
}

export interface ColorsModel {
  green_black: ColorModel;
  vine_red: ColorModel;
  gold_black: ColorModel;
  blue_sea: ColorModel;
  blue_black: ColorModel;
  white_purple: ColorModel;
  gray_shades: ColorModel;
  milk_coffee: ColorModel;
}
