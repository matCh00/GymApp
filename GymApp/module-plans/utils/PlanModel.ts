/**
 * Model planu treningowego
 */

import { ExerciseItemModel } from './../../module-creator/utils/ExerciseItemModel';

export interface PlanModel {
  name: string;
  key: string;
  exercises: ExerciseItemModel[];
}
  