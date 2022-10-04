import { PlanModel } from '../../module-plans/models/PlanModel';
/**
 * Slice to zbiór logiki reducera dla danej funkcji
 * Reducer dla logiki powiązanej z wyborem ćwiczeń
 */

import { createSlice } from "@reduxjs/toolkit";
import { ExerciseItemModel } from "../models/ExerciseItemModel";

const creatorReducer = createSlice({
  name: "selectedExercises",

  initialState: {
    exercises: [] as ExerciseItemModel[],
    editedPlan: null as PlanModel,
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
      state.editedPlan = null;
    },
    
    swapExercises: (state, action) => {
      let index = action.payload.index;
      let direction = action.payload.direction;

      if (direction === 'up' && index > 0) {
        [state.exercises[index - 1], state.exercises[index]] = [state.exercises[index], state.exercises[index - 1]];
      }
      else if (direction === 'down' && index < state.exercises.length - 1) {
        [state.exercises[index], state.exercises[index + 1]] = [state.exercises[index + 1], state.exercises[index]];
      }
    },

    loadExercises: (state, action) => {
      state.exercises = action.payload.exercises;
      state.editedPlan = action.payload.plan;
    },
  },
});

export const addExercise = creatorReducer.actions.addExercise;
export const removeExercise = creatorReducer.actions.removeExercise;
export const clearExercises = creatorReducer.actions.clearExercises;
export const swapExercises = creatorReducer.actions.swapExercises;
export const loadExercises = creatorReducer.actions.loadExercises;
export default creatorReducer.reducer;
