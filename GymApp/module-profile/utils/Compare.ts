/**
 * Sortowanie tablicy czasów
 */

import { TimesChartModel } from "../models/TimesChartModel";

export function compare(a: TimesChartModel, b: TimesChartModel) {

  if (a.section < b.section) {
    return -1;
  }
  if (a.section > b.section) {
    return 1;
  }
  return 0;
}
