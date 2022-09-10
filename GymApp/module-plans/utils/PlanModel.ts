/**
 * Model planu treningowego
 */

import { ExerciseModel } from '../../module-creator/utils/ExerciseModel';

export interface PlanModel {
  name: string;
  key: string;
  exercises: ExerciseModel[];
}
  