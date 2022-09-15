/**
 * Model rezultatu serii danego ćwiczenia
 */

import { ResultModel } from "./ResultModel";

export interface ResultsModel {
  exerciseName: string;
  results: ResultModel[];
}
   