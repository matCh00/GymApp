/**
 * Model końcowego rezultatu treningu
 */

import { ResultsModel } from "./ResultsModel";

export interface TrainingSummaryModel {
  date: string;
  summary: ResultsModel[];
}