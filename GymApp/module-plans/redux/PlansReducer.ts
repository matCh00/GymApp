/**
 * Slice to zbiór logiki reducera dla danej funkcji
 * Reducer dla logiki powiązanej z planami treningowymi
 */

import { createSlice } from "@reduxjs/toolkit";
import { PlanModel } from "../utils/PlanModel";
import { addPlanDB } from "../../firebase/Database";
 
const plansReducer = createSlice({
  name: "savedPlans",

  initialState: {
    plans: [] as PlanModel[],
  },

  reducers: {
    loadPlans: (state, action) => {
      state.plans = action.payload.plans;
    },

    addPlan: (state, action) => {
      let plan: PlanModel = {
        exercises: action.payload.exercises, 
        planName: action.payload.planName, 
        planKey: action.payload.planKey,
        created: action.payload.created
      }
      addPlanDB(action.payload.email, plan);
      state.plans.push(plan);      
    },

    removePlan: (state, action) => {
      state.plans = state.plans.filter(plan => {return (plan.planKey !== action.payload.planKey)});
    },
    
    clearPlans: (state, action) => {
      state.plans = [];
    }
  },
});
 
export const loadPlans = plansReducer.actions.loadPlans;
export const addPlan = plansReducer.actions.addPlan;
export const removePlan = plansReducer.actions.removePlan;
export const clearPlans = plansReducer.actions.clearPlans;
export default plansReducer.reducer;
 