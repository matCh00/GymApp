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
  STEP_0000: '#000000',
  STEP_000: '#050800',
  STEP_00: '#0b0e00',
  STEP_0: '#101200',
  STEP_1: '#1b2004',
  STEP_2: '#222e06', 
  STEP_3: '#283e07',
  STEP_4: '#2e4e05', 
  STEP_5: '#325f03',
  STEP_6: '#347000',
  STEP_7: '#338200',
  STEP_8: '#2d9500',
  STEP_9: '#20a805',
  STEP_99: '#7ec667',
  STEP_999: '#c1e3b2',
  STEP_9999: '#ffffff',
}

const vine_red = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#21001c',
  STEP_00: '#230020',
  STEP_0: '#260223',
  STEP_1: '#2f0325',
  STEP_2: '#390127', 
  STEP_3: '#430028',
  STEP_4: '#4d0027', 
  STEP_5: '#560026',
  STEP_6: '#5f0024',
  STEP_7: '#680021',
  STEP_8: '#70001d',
  STEP_9: '#770318',
  STEP_99: '#a95056',
  STEP_999: '#d69199',
  STEP_9999: '#ffd4dc',
}

const gold_black = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#350400',
  STEP_00: '#3a1200',
  STEP_0: '#421d00',
  STEP_1: '#4b2700',
  STEP_2: '#553200', 
  STEP_3: '#603c00',
  STEP_4: '#6c4700', 
  STEP_5: '#795200',
  STEP_6: '#865d00',
  STEP_7: '#936900',
  STEP_8: '#a17400',
  STEP_9: '#af8000',
  STEP_99: '#bd8c00',
  STEP_999: '#cc990b',
  STEP_9999: '#daa520',
}

const blue_sea = {
  ...common,
  STEP_0000: '#00004b',
  STEP_000: '#00125b',
  STEP_00: '#00216b',
  STEP_0: '#002f7a',
  STEP_1: '#003d89',
  STEP_2: '#004b97', 
  STEP_3: '#005aa4',
  STEP_4: '#0068b1', 
  STEP_5: '#0077bd',
  STEP_6: '#0086c8',
  STEP_7: '#0096d3',
  STEP_8: '#00a5dd',
  STEP_9: '#00b4e6',
  STEP_99: '#00c4ef',
  STEP_999: '#00d3f7',
  STEP_9999: '#00e3ff',
}

const blue_black = {
  ...common,
  STEP_0000: '#111111',
  STEP_000: '#17181e',
  STEP_00: '#1b1e2c',
  STEP_0: '#1f253a',
  STEP_1: '#222b48',
  STEP_2: '#253257', 
  STEP_3: '#273966',
  STEP_4: '#284076', 
  STEP_5: '#294886',
  STEP_6: '#294f96',
  STEP_7: '#2857a7',
  STEP_8: '#265eb8',
  STEP_9: '#2366c9',
  STEP_99: '#1d6edb',
  STEP_999: '#1476ed',
  STEP_9999: '#007eff',
}

const white_purple = {
  ...common,
  STEP_0000: '#1a002b',
  STEP_000: '#230f37',
  STEP_00: '#2f1b43',
  STEP_0: '#3b2650',
  STEP_1: '#47325d',
  STEP_2: '#543e6b', 
  STEP_3: '#614b78',
  STEP_4: '#6e5786', 
  STEP_5: '#7b6595',
  STEP_6: '#8972a3',
  STEP_7: '#9680b2',
  STEP_8: '#a48ec1',
  STEP_9: '#b29cd0',
  STEP_99: '#c1aae0',
  STEP_999: '#cfb9ef',
  STEP_9999: '#dec8ff',
}

const gray_shades = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#151515',
  STEP_00: '#222222',
  STEP_0: '#303030',
  STEP_1: '#3f3f3f',
  STEP_2: '#4e4e4e', 
  STEP_3: '#5e5e5e',
  STEP_4: '#6f6f6f', 
  STEP_5: '#7f7f7f',
  STEP_6: '#919191',
  STEP_7: '#a2a2a2',
  STEP_8: '#b4b4b4',
  STEP_9: '#c6c6c6',
  STEP_99: '#d9d9d9',
  STEP_999: '#ececec',
  STEP_9999: '#ffffff',
}

const milk_coffee = {
  ...common,
  STEP_0000: '#27180d',
  STEP_000: '#33241a',
  STEP_00: '#403126',
  STEP_0: '#4d3e32',
  STEP_1: '#5b4c3f',
  STEP_2: '#685b4d', 
  STEP_3: '#76695b',
  STEP_4: '#857869', 
  STEP_5: '#938878',
  STEP_6: '#a29787',
  STEP_7: '#b1a797',
  STEP_8: '#c0b7a6',
  STEP_9: '#d0c8b7',
  STEP_99: '#dfd9c7',
  STEP_999: '#efead8',
  STEP_9999: '#fffbe9',
}

export const colors: ColorsModel = {green_black, vine_red, gold_black, blue_sea, blue_black, white_purple, gray_shades, milk_coffee};