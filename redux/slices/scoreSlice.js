import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    score: 0,
    streak: 3,
  },
  reducers: {
    addToScore: (state, action) => {
      state.score += action.payload;
    },
    addToStreak: (state) => {
      state.streak++;
    },
    resetStreak: (state) => {
      state.streak = 0;
    },
  }
})


export const { addToScore, addToStreak, resetStreak } = scoreSlice.actions;
export default scoreSlice.reducer;