/**
 * Store przechowuje całe drzewo stanów aplikacji
 */

import { configureStore } from '@reduxjs/toolkit';
import muscleReducer from '../../module-creator/redux/MusclesReducer';

export const store = configureStore({
  reducer: {
    selectedMuscle: muscleReducer
  }
});