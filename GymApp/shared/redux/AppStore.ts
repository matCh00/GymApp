/**
 * Store przechowuje całe drzewo stanów aplikacji
 */

import { configureStore } from '@reduxjs/toolkit';
import muscleReducer from '../../module-creator/redux/MusclesReducer';
import creatorReducer from '../../module-creator/redux/CreatorReducer';

export const store = configureStore({
  reducer: {
    selectedMuscle: muscleReducer,
    selectedExercises: creatorReducer,
  }
});