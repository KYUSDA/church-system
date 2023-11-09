import {
  getFamilyStart,
  getFamilySuccess,
  getFamilyFailure,
} from "./familySlice";
export const getAllFamilies = (dispatch, data) => {
  console.log(data);
  dispatch(getFamilyStart());
  try {
    dispatch(getFamilySuccess(data));
  } catch (err) {
    dispatch(getFamilyFailure());
  }
};
