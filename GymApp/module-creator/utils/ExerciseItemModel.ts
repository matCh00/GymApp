/**
 * Model własnego itemu listy
 */

export interface ExerciseItemModel {
  pathName: string;
  muscleName: string;
  exerciseName: string;
  exerciseKey: string;
  signal?: () => void;
}
