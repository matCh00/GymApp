/**
 * Store przechowuje całe drzewo stanów aplikacji
 * Składaja się na to wszystkie reducery
 */

import { configureStore } from '@reduxjs/toolkit';
import muscleReducer from '../../module-creator/redux/MusclesReducer';
import creatorReducer from '../../module-creator/redux/CreatorReducer';
import plansReducer from '../../module-plans/redux/PlansReducer';

export const store = configureStore({
  reducer: {
    selectedMuscle: muscleReducer,
    selectedExercises: creatorReducer,
    savedPlans: plansReducer,
  }
});