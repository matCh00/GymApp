/**
 * Model rezultatu serii danego ćwiczenia
 */

import { ResultTimeModel } from "./ResultTimeModel";

export interface ResultsModel {
  exerciseName: string;
  muscleName: string;
  sets?: number;
  reps?: number;
  weight?: number;
  time?: ResultTimeModel;
}
   