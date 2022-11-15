import React from 'react';
import {Routes,Route,Link,Navigate} from 'react-router-dom';
import { useAuthContext } from './context/useAuthcontext';
import Mainpage from './App';
import SignUp from './components/Member/Signup';
import SignInSide from './components/Member/SignIn';
import ResetInSide from './components/Member/ResetToken';
import Newpassword from './components/Member/Resetpassword';
import Memberspage from './components/Member/Memberspage';
import Health from './components/Details/Health';
import Elders from './components/Details/Elders';
import Treasury from './components/Details/Treasury';
import Communication from './components/Details/Communication';
import Sababthschool from './components/Details/Sabbathschool';
import Amo from './components/Details/Amo';
import Welfare from './components/Details/Welfare';
import Prayer from './components/Details/Prayer';
import Religious from './components/Details/Religious';
import Patrionship from './components/Details/Patrionship';
import Personalministry from './components/Details/Personalministry';
import Development from './components/Details/Development';
import Nurture from './components/Details/Nurture';
import Chaplaincy from './components/Details/Chaplaincy';
import Alo from './components/Details/Alo'
import DiasporaA from './components/Family/DiasporaA/DiasporaA';
import DiaspoaraB from './components/Family/DiasporaB/DiasporaA';
import AroundschoolA from './components/Family/AroundschoolA/AroundA';
import AroundschoolB from './components/Family/AroundschoolB/AroundschoolB';
import Elegant from './components/Family/Elegant/elegant';
import Mjini from './components/Family/Mjini/Mjini'
import Waterfall from './components/Family/Waterfall/Waterfall';
import Ack from './components/Family/Ack/Ack'
import Ngomongo from './components/Family/Ngomongo/Ngomongo'
import Upperkutus from './components/Family/UpperKutus/Upperkutus';
import Kibugi from './components/Family/Kibugi/Kibugi';
import Penri from './components/Family/Penri/Penri';
import GardenEstate from './components/Family/GardenEstate/GardenEstate';
import Kanjata from './components/Family/Kanjata/Kanjata';
const Home = ()=>{
  const { user } = useAuthContext();
  return (
  <Routes>
    <Route path='/' element={<Mainpage />}></Route>
    <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/member' />}></Route>
    <Route path='/signin' element={ !user ? <SignInSide />: <Navigate to='/member'/>}></Route>
    <Route path='/resetToken' element={<ResetInSide />}></Route>
    <Route path='/resetPassword' element={   <Newpassword />}></Route>
    <Route path='/member' element={user ? <Memberspage /> :<Navigate to='/signin' />}></Route>
    <Route path='/departmentDetails/health' element={ <Health />}></Route>
    <Route path='/departmentDetails/elders' element={<Elders />}/><Route />
    <Route path='/departmentDetails/treasury' element={ <Treasury />}></Route>
    <Route path='/departmentDetails/communication' element={<Communication />}></Route>
    <Route path='/departmentDetails/sabbathschool' element={<Sababthschool />}></Route>
    <Route path='/departmentDetails/AMO' element={<Amo />}></Route>
    <Route path='/departmentDetails/welfare' element={<Welfare />}></Route>
    <Route path='/departmentDetails/prayer' element={<Prayer />}></Route>
    <Route path='/departmentDeatils/religiousliberty' element={<Religious />}></Route>
    <Route path='/departmentDetails/patrionship' element={<Patrionship />}></Route>
    <Route path='/departmentDetails/PersonalMinistry' element={<Personalministry />}></Route>
    <Route path='/departmentDetails/development' element={<Development />}></Route>
    <Route path='/departmentDetails/NRT' element={<Nurture />}></Route>
    <Route path='/departmentDetails/chaplaincy' element={<Chaplaincy />}></Route>
    <Route path='/departmentDetails/Alo' element={<Alo />}></Route>
    <Route path='/DiasporaA' element={<DiasporaA />}></Route>
    <Route path='/DiasporaB' element={<DiaspoaraB />}></Route>
    <Route path='/AroundSchoolA' element={<AroundschoolA />}></Route>
    <Route path='/AroundSchoolB' element={<AroundschoolB />}></Route>
    <Route path='/elegant' element={<Elegant />}></Route>
    <Route path='/mjini' element={<Mjini />}></Route>
    <Route path='/waterfall' element={<Waterfall />}></Route>
    <Route path='/Ack' element={<Ack />}></Route>
    <Route path='/ngomongo' element={<Ngomongo />}></Route>
    <Route path='/upperkutus' element={<Upperkutus />}></Route>
    <Route path='/kibugi' element={<Kibugi />}></Route>
    <Route path='/Penri' element={<Penri />}></Route>
    <Route path='/Gardenestate' element={<GardenEstate />}></Route>
    <Route path='/kanjata' element={<Kanjata />}></Route>
  </Routes>
  )
}

export default Home