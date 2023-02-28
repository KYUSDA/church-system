import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getdepartmentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getdepartmentSuccess: (state, action) => {
      state.isFetching = false;
      state.departments = action.payload;
    },
    getdepartmentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deletedepartmentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletedepartmentSuccess: (state, action) => {
      state.isFetching = false;
      state.departments.splice(
        state.departments.findIndex((department) => department._id === action.payload),
        1
      );
    },
    deletedepartmentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updatedepartmentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatedepartmentSuccess: (state, action) => {
      state.isFetching = false;
      state.claims[
        state.departments.findIndex((department) => department._id === action.payload.id)
      ] = action.payload.updateddepartment;
    },
    updatedepartmentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    adddepartmentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    adddepartmentSuccess: (state, action) => {
      state.isFetching = false;
      state.claims.push(action.payload);
    },
    adddepartmentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getdepartmentStart,
  getdepartmentSuccess,
  getdepartmentFailure,
  deletedepartmentStart,
  deletedepartmentSuccess,
  deletedepartmentFailure,
  updatedepartmentStart,
  updatedepartmentSuccess,
  updatedepartmentFailure,
  addDepartmentStart,
  addDepartmentSuccess,
  addDepartmentFailure,
} = departmentSlice.actions;

export default departmentSlice.reducer;