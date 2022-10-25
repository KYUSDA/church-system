import React from 'react';
import {Routes,Route,Link} from 'react-router-dom';
import Mainpage from './App';
import SignUp from './components/Member/Signup';
import SignInSide from './components/Member/SignIn';
import ResetInSide from './components/Member/ResetToken';
import Newpassword from './components/Member/Resetpassword';
const Home = ()=>{
  return (
  <Routes>
    <Route path='/' element={ <Mainpage />}></Route>
    <Route path='/signup' element={<SignUp />}></Route>
    <Route path='/signin' element={<SignInSide />}></Route>
    <Route path='/resetToken' element={<ResetInSide />}></Route>
    <Route path='/resetPassword' element={<Newpassword />}></Route>
  </Routes>
  )
}

export default Home