import {
  getFamilyStart,
  getFamilySuccess,
  getFamilyFailure,
} from "./familySlice";
import {
  getDepartmentStart,
  getDepartmentSuccess,
  getDepartmentFailure,
} from "./departmentSlice";
export const getAllFamilies = (dispatch, data) => {
  dispatch(getFamilyStart());
  try {
    dispatch(getFamilySuccess(data));
  } catch (err) {
    dispatch(getFamilyFailure());
  }
};

export const getAllDepartments = (dispatch, data) => {
  console.log(data);
  dispatch(getDepartmentStart());
  try {
    dispatch(getDepartmentSuccess(data));
  } catch (err) {
    dispatch(getDepartmentFailure());
  }
};
