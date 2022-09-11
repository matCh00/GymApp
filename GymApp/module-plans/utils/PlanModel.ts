/**
 * Model planu treningowego
 */

import { ExerciseModel } from '../../module-creator/utils/ExerciseModel';

export interface PlanModel {
  planName: string;
  planKey: string;
  exercises: ExerciseModel[];
  created: Date;
}
  