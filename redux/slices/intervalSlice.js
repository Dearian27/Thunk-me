import { createSlice } from "@reduxjs/toolkit";

const intervalSlice = createSlice({
  name: 'interval',
  initialState: {
    timeEnd: null, // null | Date
    status: 'passive', // 'passive' | 'active' | 'waiting' | 'approving'
    number: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTimeEnd: (state, action) => {
      state.timeEnd = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    }
  }
})

export const { setStatus, setTimeEnd, setNumber } = intervalSlice.actions;
export default intervalSlice.reducer;