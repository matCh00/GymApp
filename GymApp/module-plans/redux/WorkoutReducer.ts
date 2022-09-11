import { ResultModel } from './../utils/ResultModel';
/**
 * Slice to zbiór logiki reducera dla danej funkcji
 * Reducer dla logiki powiązanej wybranym planem treningowym
 */

import { createSlice } from "@reduxjs/toolkit";
import { PlanModel } from "../utils/PlanModel";
 
const workoutReducer = createSlice({
  name: "selectedPlan",

  initialState: {
    plan: {} as PlanModel,
    results: [] as ResultModel[],
  },

  reducers: {
    selectPlan: (state, action) => {
      state.plan = action.payload.plan;    
    },

    unselectPlan: (state, action) => {
      state.plan = {} as PlanModel;
    },

    addResult: (state, action) => {
      state.results.push(action.payload.result);
    },

    clearResults: (state, action) => {
      state.results = [] as ResultModel[];
    },
  },
});
 
export const selectPlan = workoutReducer.actions.selectPlan;
export const unselectPlan = workoutReducer.actions.unselectPlan;
export const addResult = workoutReducer.actions.addResult;
export const clearResults = workoutReducer.actions.clearResults;
export default workoutReducer.reducer;
 