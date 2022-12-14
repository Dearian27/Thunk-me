import { createSlice } from "@reduxjs/toolkit";

const intervalSlice = createSlice({
  initialState: {
    time: null,
    status: 'passive', // 'passive' | 'active'
  },
  name: 'interval',
  reducers: {
    setStatus: () => {

    },
    setTimeEnd: () => {

    }
  }
})

export const { setStatus, setTimeEnd } = intervalSlice.actions;
export default intervalSlice.reducer;