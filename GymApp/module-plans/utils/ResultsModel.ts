/**
 * Model rezultatu serii danego ćwiczenia
 */

import { ResultModel } from "./ResultModel";

export interface ResultsModel {
  exerciseName: string;
  muscleName: string;
  sets?: number;
  reps?: number;
  weight?: number;
  results?: ResultModel[];
}
   