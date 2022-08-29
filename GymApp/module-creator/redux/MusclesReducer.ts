/**
 * Slice to zbiór logiki reducera dla danej funkcji
 */

import { createSlice } from "@reduxjs/toolkit";
import MusclesEnum from "../utils/MusclesEnum";

const muscleReducer = createSlice({
  name: "selectedMuscle",
  initialState: {
    muscle: '' as MusclesEnum,
  },
  reducers: {
    changeMuscle: (state, action) => {
      state.muscle = action.payload.muscle;
    },
  },
});

export const changeMuscle = muscleReducer.actions.changeMuscle;
export default muscleReducer.reducer;
