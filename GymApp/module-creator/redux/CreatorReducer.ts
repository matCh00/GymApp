/**
 * Slice to zbiór logiki reducera dla danej funkcji
 */

import { createSlice } from "@reduxjs/toolkit";
import { ExerciseItemModel } from "../utils/ExerciseItemModel";

const creatorReducer = createSlice({
  name: "selectedExercises",
  initialState: {
    exercises: [] as ExerciseItemModel[],
  },
  reducers: {
    addExercise: (state, action) => {
      state.exercises.push(action.payload.exercise);      
    },
    removeExercise: (state, action) => {
      state.exercises = state.exercises.filter(e => {return (e.exerciseKey !== action.payload.exerciseKey)});
      //state.exercises.splice(state.exercises.findIndex(e => {e.exerciseKey === action.payload.exerciseKey}), 1)
    },
    clearExercises: (state, action) => {
      state.exercises = [];
    },
  },
});

export const addExercise = creatorReducer.actions.addExercise;
export const removeExercise = creatorReducer.actions.removeExercise;
export const clearExercises = creatorReducer.actions.clearExercises;
export default creatorReducer.reducer;
