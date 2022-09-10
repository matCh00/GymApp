/**
 * Model komponentu do ustawiania serii, powtórzeń, ciężaru danego ćwiczenia
 */

export interface ExerciseSettingModel {
  name: string;
  count: number;
  setCount(value: number): void | Promise<void>;
  type?: string;
}