/**
 * Model kafelka ćwiczenia
 */

export interface ExerciseItemModel {
  pathName: string;
  muscleName: string;
  exerciseName: string;
  exerciseKey: string;
  sets?: number;
  reps?: number;
  weight?: number;
}
