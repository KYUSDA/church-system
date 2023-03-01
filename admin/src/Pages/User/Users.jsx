import React,{useState,useEffect,useMemo} from 'react'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import { Link, useLocation } from 'react-router-dom';
import './Users.css'
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethods';
import {format} from 'timeago.js';
import { useDispatch } from 'react-redux';
import {updateUser} from '../../redux/apiCall';
const Users = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  console.log(userId)
  const user = useSelector((state)=>state.user.currentUser.find((user)=>user._id === userId));
  console.log(userId,user);
 const dispatch = useDispatch();
 const [inputs ,setInputs] = useState();
 const handleChange = (e)=>{
  setInputs((prev)=>{
    console.log({...prev,[e.target.name]:e.target.value})
      return {...prev,[e.target.name]:e.target.value}
  })
}

const handleClick = (e)=>{
  console.log('updating');
e.preventDefault();
console.log({...inputs});
const updateUsers = {...inputs}
updateUser(userId,updateUsers,dispatch)
// alert('user updated');
// window.location.replace('/');
}
  return (
<div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.firstName}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.lastName}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.registration}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.course}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.year}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.role}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>firstname</label>
                <input
                  type="text"
                  name='firstName'
                  placeholder={user.firstName}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>lastname</label>
                <input
                  type="text"
                  name='lastName'
                  placeholder={user.lastName}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name='email'
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Course</label>
                <input
                  type="text"
                  name='course'
                  placeholder={user.course}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Year</label>
                <input
                  type="text"
                  name='year'
                  placeholder={user.year}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Registration No</label>
                <input
                  type="text"
                  name='registration'
                  placeholder={user.registration}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button onClick={handleClick} className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Users
