/**
 * Store przechowuje całe drzewo stanów aplikacji
 * Składaja się na to wszystkie reducery
 */

import { configureStore } from '@reduxjs/toolkit';
import muscleReducer from '../../modules/creator/redux/MusclesReducer';
import creatorReducer from '../../modules/creator/redux/CreatorReducer';
import plansReducer from '../../modules/plans/redux/PlansReducer';
import workoutReducer from '../../modules/plans/redux/WorkoutReducer';

export const store = configureStore({
  reducer: {
    selectedMuscle: muscleReducer,
    selectedExercises: creatorReducer,
    savedPlans: plansReducer,
    selectedPlan: workoutReducer,
  }
});