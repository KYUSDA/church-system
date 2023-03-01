import { 
  loginFailure, 
  loginStart,
  loginSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure
} 
from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getdepartmentFailure,
  getdepartmentStart,
  getdepartmentSuccess,
  deletedepartmentFailure,
  deletedepartmentStart,
  deletedepartmentSuccess,
  updatedepartmentFailure,
  updatedepartmentStart,
  updatedepartmentSuccess,
  addDepartmentFailure,
  addDepartmentStart,
  addDepartmentSuccess,
} from "./departmentRedux";


import {
getfamilyStart,
getfamilyFailure,
getfamilySuccess,
updatefamilyStart,
updatefamilySuccess,
updatefamilyFailure,
deletefamilyFailure,
deletefamilyStart,
deletefamilySuccess
} from './familiesRedux';

export const login = async (dispatch, user) => {

  dispatch(loginStart());
  try {
    console.log(dispatch,user);
    const res = await publicRequest.post("Auth/signIn", user);
    console.log(res.data.user.role);
      dispatch(loginSuccess(res.data));
if(res.data.user.role === 'admin'){
 localStorage.setItem('loggedIn',res.data.user.role)
  alert('logged in as Admin');
  window.location.replace('/');
}else{
  alert('Wrong creditials Only admins Allowed');
  dispatch(loginFailure());
}
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getDepartments = async (dispatch) => {
  dispatch(getdepartmentStart());
  try {
    const res = await publicRequest.get("/department/getAll");
console.log(res);
    dispatch(getdepartmentSuccess(res.data));
  } catch (err) {
    dispatch(getdepartmentFailure());
  }
};

export const deleteDepartment = async (id, dispatch) => {
  dispatch(deletedepartmentStart());
  try {
     await userRequest.delete(`/department/${id}`);
    dispatch(deletedepartmentSuccess(id));
  } catch (err) {
    dispatch(deletedepartmentFailure());
  }
};

export const updateDepartment = async (id, updatedDepartment, dispatch) => {
  dispatch(updatedepartmentStart());
  try {
    //update in mongodb
  const res =   await userRequest.patch(`/department/${id}`,updatedDepartment);
  console.log(res)
    // update in our state.
    dispatch(updatedepartmentSuccess({ id, updatedDepartment }));
  } catch (err) {
    dispatch(updatedepartmentFailure());
  }
};
export const addDepartment = async (claim, dispatch) => {
  dispatch(addDepartmentStart());
  try {
    const res = await userRequest.post(`/claim/createclaim`, claim);
    dispatch(addDepartmentSuccess(res.data));
  } catch (err) {
    dispatch(addDepartmentFailure());
  }
};


//user
export const getUsers = async (dispatch)=>{
dispatch(getUserStart());
try{
const res = await userRequest.get('/user/getUsers');
console.log(res);
console.log(res.data);
dispatch(getUserSuccess(res.data));
}catch(err){
dispatch(getUserFailure());
}
}

//delete user 
export const deleteUser = async (id,dispatch)=>{
  dispatch(deleteUserStart())
  try
  {
  const resp =  await userRequest.delete(`/user/${id}`);
  console.log(resp);
    dispatch(deleteUserSuccess())
  }catch(err){
dispatch(deleteUserFailure());
  }
}

//update User
export const updateUser = async(id,userUpdate,dispatch)=>{
  console.log(userUpdate);
   await userRequest.patch(`/user/${id}`,userUpdate);
// dispatch(updateUserStart({id,userUpdate}))
try
{
dispatch(updateUserSuccess({id,userUpdate}))
}catch(err){
  dispatch(updateUserFailure)
}
}

//add user

export const addUser = async (user, dispatch) => {
  console.log(user);
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/user/createUser`, user);
    console.log(res);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

//families
export const getFamilies = async(dispatch)=>{
  dispatch(getfamilyStart());
  try{
  const res = await userRequest.get('/family/getFamilies');
  console.log(res);
  console.log(res.data);
  dispatch(getfamilySuccess(res.data));
  }catch(err){
  dispatch(getfamilyFailure());
  }
}

export const updateFamily = async(id,family,dispatch)=>{
  console.log(family);
  dispatch(updatefamilyStart())
  try
  {
  dispatch(updatefamilySuccess({id,family}))
  }catch(err){
    dispatch(updatefamilyFailure)
  }
}

export const deleteFamily = async (id,dispatch)=>{
  dispatch(deletefamilyStart())
  try
  {
  const resp =  await userRequest.delete(`/family/${id}`);
  console.log(resp);
    dispatch(deletefamilySuccess())
  }catch(err){
dispatch(deletefamilyFailure());
  }
}