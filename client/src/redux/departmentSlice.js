import { createSlice } from "@reduxjs/toolkit";
export const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getDepartmentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getDepartmentSuccess: (state, action) => {
      state.isFetching = false;
      state.departments = action.payload;
    },
    getDepartmentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});
export const {
  getDepartmentStart,
  getDepartmentSuccess,
  getDepartmentFailure,
} = departmentSlice.actions;
export default departmentSlice.reducer;
