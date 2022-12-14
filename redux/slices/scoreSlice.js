import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    score: 0
  },
  reducers: {
    addToScore: (state, action) => {
      state.score++;
    }
  }
})

export const { addToScore } = scoreSlice.actions;
export default scoreSlice.reducer;