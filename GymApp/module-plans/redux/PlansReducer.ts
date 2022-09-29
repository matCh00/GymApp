/**
 * Slice to zbiór logiki reducera dla danej funkcji
 * Reducer dla logiki powiązanej z planami treningowymi
 */

import { createSlice } from "@reduxjs/toolkit";
import { PlanModel } from "../utils/PlanModel";
import { addPlanDB, deletePlanDB } from "../../firebase/Database";
 
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

    updatePlan: (state, action) => {
      let plan: PlanModel = {
        exercises: action.payload.exercises, 
        planName: action.payload.planName, 
        planKey: action.payload.planKey,
        created: action.payload.created
      }
      addPlanDB(action.payload.email, plan);

      let index = state.plans.findIndex(p => p.created === plan.created);
      state.plans[index] = plan;
    },

    removePlan: (state, action) => {
      deletePlanDB(action.payload.email, action.payload.planName);
      state.plans = state.plans.filter(plan => {return (plan.planName !== action.payload.planName)});
    },
    
    clearPlans: (state, action) => {
      state.plans = [];
    }
  },
});
 
export const loadPlans = plansReducer.actions.loadPlans;
export const addPlan = plansReducer.actions.addPlan;
export const updatePlan = plansReducer.actions.updatePlan;
export const removePlan = plansReducer.actions.removePlan;
export const clearPlans = plansReducer.actions.clearPlans;
export default plansReducer.reducer;
 