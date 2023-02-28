import { createSlice } from "@reduxjs/toolkit";

export const familySlice = createSlice({
  name: "family",
  initialState: {
    families: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getfamilyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getfamilySuccess: (state, action) => {
      state.isFetching = false;
      state.families = action.payload;
    },
    getfamilyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
   deletefamilyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
   deletefamilySuccess: (state, action) => {
      state.isFetching = false;
      state.families.splice(
        state.families.findIndex((family) => family._id === action.payload),
        1
      );
    },
   deletefamilyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updatefamilyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatefamilySuccess: (state, action) => {
      state.isFetching = false;
      state.family[
        state.families.findIndex((family) => family._id === action.payload.id)
      ] = action.payload.updatedfamily;
    },
    updatefamilyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addfamilySuccess: (state, action) => {
      state.isFetching = false;
      state.families.push(action.payload);
    },
    addfamilyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getfamilyStart,
  getfamilySuccess,
  getfamilyFailure,
 deletefamilyStart,
 deletefamilySuccess,
 deletefamilyFailure,
  updatefamilyStart,
  updatefamilySuccess,
  updatefamilyFailure,
  addfamilyStart,
  addfamilySuccess,
  addfamilyFailure,
} = familySlice.actions;

export default familySlice.reducer;