import './App.css';
import Topbar from './Dashboard/TopBar/Topbar';
import Sidebar from './Dashboard/SideBar/Sidebar';
import Home from './Pages/Home/Home';
import UserList from './Pages/Userlist/UserList';
import User from './Pages/User/Users';
import Newuser from './Pages/NewUser/Newuser';
import { BrowserRouter as Router ,Routes ,Route, Navigate } from 'react-router-dom';
import Department from './Pages/Department/Department';
import Family from './Pages/Family/Family';
import DepartmentList from './Pages/DepartmentList/DepartmentList';
import FamilyList from './Pages/FamilyList/FamilyList';
import NewClaim from './Pages/NewDepartment/NewDepartment';
import Login from './Pages/login/Login';
import React from 'react';
import { useSelector } from 'react-redux';

const App = () => {
  // const admin = useSelector((state) => state.user.currentUser.isAdmin);
  // const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token;
const admin = localStorage.getItem('loggedIn');
  return (
    <Router>
  <Routes>
        <Route path='/login' element={<Login />} />
  </Routes>
      <>
        <Topbar />
  <div className='container'>
    <Sidebar />
    <Routes>
<Route exact path='/' element={<Home/>}/>
<Route path='/users' element={<UserList />} />
<Route path='/user/:id' element={<User />}/>
<Route path='/newUser' element={<Newuser />}/>
<Route path='/department/:id' element={<Department />}/>
<Route path='/family/:id' element={<Family />}/>
<Route path='/departments' element={<DepartmentList />}/>
<Route path='/families' element={<FamilyList />}/>
<Route path='/newClaim' element={<NewClaim />}/>  
    </Routes>
    </div>
      </>
    </Router>
  )
}

export default App