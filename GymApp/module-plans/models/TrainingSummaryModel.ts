/**
 * Model końcowego rezultatu treningu
 */

import { ResultsModel } from "./ResultsModel";
import { SummaryTimeModel } from "./SummaryTimeModel";

export interface TrainingSummaryModel {
  date: string;
  summary?: ResultsModel[];
  time?: SummaryTimeModel;
}