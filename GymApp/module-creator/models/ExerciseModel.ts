/**
 * Model ćwiczenia
 */

export interface ExerciseModel {
  pathName: string;
  muscleName: string;
  exerciseName: string;
  exerciseKey: string;
  sets?: number;
  reps?: number;
  weight?: number;
}
