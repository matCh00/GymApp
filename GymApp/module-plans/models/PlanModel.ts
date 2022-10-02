/**
 * Model planu treningowego
 */

import { ExerciseModel } from '../../module-creator/models/ExerciseModel';

export interface PlanModel {
  planName: string;
  planKey: string;
  exercises: ExerciseModel[];
  created: Date;
}
  