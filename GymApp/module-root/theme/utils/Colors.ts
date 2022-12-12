/**
 * Kolory
 * https://colordesigner.io/gradient-generator  mode: LAB/RGB/LCH
 */

import { ColorsModel } from "../models/ColorsModel";

const common = {
  SUCCESS: 'green',
  WARNING: 'yellow',
  ERROR: 'red', 
};

const green_black = {
  ...common,
  STEP_0000: '#000000',  // black
  STEP_000: '#050800',
  STEP_00: '#0b0e00',
  STEP_0: '#101200',  // first
  STEP_1: '#1b2004',
  STEP_2: '#222e06', 
  STEP_3: '#283e07',
  STEP_4: '#2e4e05', 
  STEP_5: '#325f03',
  STEP_6: '#347000',
  STEP_7: '#338200',
  STEP_8: '#2d9500',
  STEP_9: '#20a805',  // second
  STEP_99: '#7ec667',
  STEP_999: '#c1e3b2',
  STEP_9999: '#e1f1da',  // light second
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
  STEP_000: '#1a0000',
  STEP_00: '#200d01',
  STEP_0: '#2b1200',
  STEP_1: '#3a1b08',
  STEP_2: '#4a250d', 
  STEP_3: '#59300f',
  STEP_4: '#693b10', 
  STEP_5: '#784810',
  STEP_6: '#87550e',
  STEP_7: '#95620c',
  STEP_8: '#a27107',
  STEP_9: '#af8000',
  STEP_99: '#c8a34d',
  STEP_999: '#e1c787',
  STEP_9999: '#faebc3',
}

const blue_sea = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#000412',
  STEP_00: '#000a16',
  STEP_0: '#000f27',
  STEP_1: '#011c3b',
  STEP_2: '#012851', 
  STEP_3: '#013567',
  STEP_4: '#00427f', 
  STEP_5: '#005097',
  STEP_6: '#005eb0',
  STEP_7: '#006cca',
  STEP_8: '#007be4',
  STEP_9: '#008aff',
  STEP_99: '#52a8ff',
  STEP_999: '#87c5ff',
  STEP_9999: '#bbe0ff',
}

const purple_black = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#0e0018',
  STEP_00: '#12031b',
  STEP_0: '#190525',
  STEP_1: '#240e38',
  STEP_2: '#31124d', 
  STEP_3: '#3e1563',
  STEP_4: '#4d1979', 
  STEP_5: '#5c1b90',
  STEP_6: '#6c1ea7',
  STEP_7: '#7d1fbf',
  STEP_8: '#8e20d7',
  STEP_9: '#a020f0',
  STEP_99: '#b35bef',
  STEP_999: '#c486ed',
  STEP_9999: '#d2adea',
}

const milk_coffee = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#190f03',
  STEP_00: '#221a13',
  STEP_0: '#2d241d',
  STEP_1: '#3d342c',
  STEP_2: '#4e443b', 
  STEP_3: '#5f554b',
  STEP_4: '#71675c', 
  STEP_5: '#837a6d',
  STEP_6: '#968c7f',
  STEP_7: '#a9a091',
  STEP_8: '#bcb4a4',
  STEP_9: '#d0c8b7',
  STEP_99: '#dfd8c8',
  STEP_999: '#efe8da',
  STEP_9999: '#fff9ec',
}

const dusk = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#131f2a',
  STEP_00: '#193951',
  STEP_0: '#19547b',
  STEP_1: '#3d342c',
  STEP_2: '#5c6f83', 
  STEP_3: '#757d87',
  STEP_4: '#8c8c8b', 
  STEP_5: '#a39a8f',
  STEP_6: '#baa992',
  STEP_7: '#d1b995',
  STEP_8: '#e8c898',
  STEP_9: '#ffd89b',
  STEP_99: '#ffe2b5',
  STEP_999: '#ffedcf',
  STEP_9999: '#fff7ea',
}

const almost = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#160302',
  STEP_00: '#2b0705',
  STEP_0: '#4a0d0a',
  STEP_1: '#571c1a',
  STEP_2: '#642928', 
  STEP_3: '#713736',
  STEP_4: '#7e4545', 
  STEP_5: '#8b5355',
  STEP_6: '#986165',
  STEP_7: '#a47075',
  STEP_8: '#b17e86',
  STEP_9: '#be8d98',
  STEP_99: '#cb9daa',
  STEP_999: '#d7acbc',
  STEP_9999: '#e4bcce',
}

const relay = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#130926',
  STEP_00: '#27134b',
  STEP_0: '#3a1c71',
  STEP_1: '#502c72',
  STEP_2: '#663d73', 
  STEP_3: '#7c4d74',
  STEP_4: '#925d75', 
  STEP_5: '#a76e77',
  STEP_6: '#bd7e78',
  STEP_7: '#d38e79',
  STEP_8: '#e99f7a',
  STEP_9: '#ffaf7b',
  STEP_99: '#fdc19a',
  STEP_999: '#fbd3b9',
  STEP_9999: '#f9e5d8',
}

const purple_white = {
  ...common,
  STEP_0000: '#000000',
  STEP_000: '#32181e',
  STEP_00: '#5f2635',
  STEP_0: '#91334e',
  STEP_1: '#9a4258',
  STEP_2: '#a35163', 
  STEP_3: '#ac5f6e',
  STEP_4: '#b46e79', 
  STEP_5: '#bd7c84',
  STEP_6: '#c58a90',
  STEP_7: '#cd999b',
  STEP_8: '#d5a7a7',
  STEP_9: '#ddb6b3',
  STEP_99: '#e5c4bf',
  STEP_999: '#edd3cc',
  STEP_9999: '#f4e2d8',
}

export const colors: ColorsModel = {
  green_black, vine_red, gold_black, blue_sea, purple_black, milk_coffee, dusk, almost, relay, purple_white
};