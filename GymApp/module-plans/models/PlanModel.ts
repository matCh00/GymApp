/**
 * Model planu treningowego
 */

import { ExerciseItemModel } from '../../module-creator/models/ExerciseItemModel';

export interface PlanModel {
  planName: string;
  planKey: string;
  exercises: ExerciseItemModel[];
  created: Date;
}
  