/**
 * Kolory
 */

import { ColorsModel } from "../models/ColorsModel";

const common = {
  SUCCESS: 'green',
  WARNING: 'yellow',
  ERROR: 'red', 
};

const green_black = {
  ...common,
  PRIMARY: '#4deb38',
  SECONDARY: '#232323',   
  BACKGROUND_HEADER: '#232323',
  BACKGROUND_SECOND_HEADER: '#353535',
  BACKGROUND_SCREEN_PRIMARY: '#4deb38',
  BACKGROUND_SCREEN_SECONDARY: '#21a210',
  BACKGROUND_SCREEN_TERTIARY: '#0d4006',
  TEXT_PRIMARY: '#ebeced',
  TEXT_SECONDARY: '#9ff494',
  ACTIVE_TINT: '#4deb38',
  ACTIVE_BACKGROUND: '#232323',
  INACTIVE_TINT: '#21a210',
  INACTIVE_BACKGROUND: '#353535',
}

export const colors: ColorsModel = {green_black,};