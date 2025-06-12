import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: 'button',
  initialState: {
    togglePage: false // default value
  },
  reducers: {
    togglePageButton: (state) => {
      state.togglePage = !state.togglePage;
    }
  }
});

export const { togglePageButton } = toggleSlice.actions;
export default toggleSlice.reducer;
