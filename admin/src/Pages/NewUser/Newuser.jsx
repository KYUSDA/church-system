import React,{useState,useEffect,useMemo} from 'react';
import './Newuser.css';
import { addUser } from '../../redux/apiCall';
import { useDispatch } from 'react-redux';
const Newuser = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e)=>{
setInputs((prev)=>{
  return {...prev,[e.target.name]:e.target.value}
})
console.log(inputs);
  }

  const handleClick = (e)=>{
    e.preventDefault();
    const claim = {...inputs};
    console.log(claim)
    addUser(claim,dispatch);
    alert('user created');
    window.location.replace('/');
  }
  return (
    <div className="newUser">
    <h1 className="newUserTitle">New Church Member</h1>
    <form className="newUserForm">
      <div className="newUserItem">
        <label>firstName</label>
        <input
            name="firstName"
            type="text"
            placeholder="firstname"
            onChange={handleChange}
          />
      </div>
      <div className="newUserItem">
        <label>lastName</label>
        <input
            name="lastName"
            type="text"
            placeholder="lastname"
            onChange={handleChange}
          />
      </div>
      <div className="newUserItem">
        <label>Email</label>
        <input
            name="email"
            type="string"
            placeholder="Email"
            onChange={handleChange}
          />
      </div>
      <div className="newUserItem">
        <label>Registration</label>
        <input
            name="registration"
            type="string"
            placeholder="registration no"
            onChange={handleChange}
          />
      </div>
      <div className="newUserItem">
        <label>Course</label>
        <input
            name="course"
            type="text"
            placeholder="Password"
            onChange={handleChange}
          />
      </div>
      <div className="newUserItem">
        <label>Year</label>
        <input
            name="year"
            type="number"
            placeholder="Year"
            onChange={handleChange}
          />
      </div>
      <div className="newUserItem">
        <label>Password</label>
        <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
      </div>
      <div className="newUserItem">
        <label>Password Confirm</label>
        <input
            name="passwordConfirm"
            type="password"
            placeholder="Password confirm"
            onChange={handleChange}
          />
      </div>
      <button onClick={handleClick} className="newUserButton">Create</button>
    </form>
  </div>
  )
}

export default Newuser
