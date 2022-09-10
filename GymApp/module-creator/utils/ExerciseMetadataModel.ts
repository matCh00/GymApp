/**
 * Model dodatkowych danych ćwiczenia
 */

export interface ExerciseMetadataModel {
  name: string;
  count: number;
  setCount(value: number): void | Promise<void>;
  type?: string;
}