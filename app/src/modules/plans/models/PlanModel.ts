/**
 * Model planu treningowego
 */

import { ExerciseItemModel } from '../../creator/models/ExerciseItemModel';

export interface PlanModel {
  planName: string;
  planKey: string;
  exercises: ExerciseItemModel[];
  created: Date;
}
  