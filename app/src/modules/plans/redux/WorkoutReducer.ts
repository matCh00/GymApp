/**
 * Slice to zbiór logiki reducera dla danej funkcji
 * Reducer dla logiki powiązanej wybranym planem treningowym
 */

import { createSlice } from "@reduxjs/toolkit";
import { PlanModel } from "../models/PlanModel";
 
const workoutReducer = createSlice({
  name: "selectedPlan",

  initialState: {
    plan: {} as PlanModel,
  },

  reducers: {
    selectPlan: (state, action) => {
      state.plan = action.payload.plan;    
    },

    unselectPlan: (state, action) => {
      state.plan = {} as PlanModel;
    },
  },
});
 
export const selectPlan = workoutReducer.actions.selectPlan;
export const unselectPlan = workoutReducer.actions.unselectPlan;
export default workoutReducer.reducer;
 