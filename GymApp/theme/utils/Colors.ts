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
  SECONDARY: '#202020',   
  BACKGROUND_HEADER: '#1d1d1d',
  BACKGROUND_SECOND_HEADER: '#2e2e2e',
  BACKGROUND_SCREEN_PRIMARY: '#4deb38',
  BACKGROUND_SCREEN_SECONDARY: '#249215',
  BACKGROUND_SCREEN_TERTIARY: '#0d4006',
  TEXT_PRIMARY: '#ebeced',
  TEXT_SECONDARY: '#caffc3',
  ACTIVE_TINT: '#4deb38',
  ACTIVE_BACKGROUND: '#353535',
  INACTIVE_TINT: '#1c880e',
  INACTIVE_BACKGROUND: '#232323',
}

const blue_pink = {
  ...common,
  PRIMARY: '#ff2cdf',
  SECONDARY: '#0014ff',   
  BACKGROUND_HEADER: '#0010c2',
  BACKGROUND_SECOND_HEADER: '#00096d',
  BACKGROUND_SCREEN_PRIMARY: '#ff2cdf',
  BACKGROUND_SCREEN_SECONDARY: '#a52091',
  BACKGROUND_SCREEN_TERTIARY: '#6b165e',
  TEXT_PRIMARY: '#bdc2ff',
  TEXT_SECONDARY: '#ffb4f4',
  ACTIVE_TINT: '#ff7aeb',
  ACTIVE_BACKGROUND: '#3440c0',
  INACTIVE_TINT: '#ff49e4',
  INACTIVE_BACKGROUND: '#1a28c0',
}

export const colors: ColorsModel = {green_black, blue_pink};