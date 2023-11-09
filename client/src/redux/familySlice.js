import { createSlice } from "@reduxjs/toolkit";
export const familySlice = createSlice({
  name: "family",
  initialState: {
    families: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getFamilyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getFamilySuccess: (state, action) => {
      state.isFetching = false;
      state.families = action.payload;
    },
    getFamilyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getFamilyStart, getFamilySuccess, getFamilyFailure } =
  familySlice.actions;

export default familySlice.reducer;
