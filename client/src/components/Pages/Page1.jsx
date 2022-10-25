import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState,useEffect,useContext} from 'react';
import {makeStyles} from '@material-ui/core';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import {useNavigate} from 'react-router-dom';
import { useLocation,Link} from 'react-router-dom'
import {UserContext} from '../Pages/Context'
import "../Navbar/Navbar.css"
const useStyles = makeStyles((theme)=>({
        ptext:{
            textAlign:'center',
            textTransform:'uppercase',
            margin:"20px auto",
            color:'orange',
            fonSize:'25px',
        },
        btn:{
            margin:'200px auto',
            bottom:'0px',
        },
        textFields:{
            display:'flex',
            flexWrap:'wrap',
            justifyContent:'center',
            alignItems:'center'
        },
        claimerror:{
            backgroundColor:'red'
        },
        item:{
            margin:'20px 20px'
        },
        btn:{
            cursor:'pointer',
            '&:hover':{
                backgroundColor:'crimson'
            }
        },
        clear:{
margin:"150px 15px",
backgroundColor:'pink',
cursor:'pointer',
padding:'10px',
'&:hover':{
    backgroundColor:'crimson'
}
        }
}))
const Page1 = (props)=>{
 const location = useLocation();
  const {formId} = location.state;
  const {email} = location.state;
  console.log(email,formId);
  const nav  = useNavigate();
    //error part
    const policyerror = document.querySelector('.policyno');
    const claimerror  = document.querySelector('.claimerror');
    const renewDateError  = document.querySelector('.renewalDate');
    const insuredNameError  = document.querySelector('.renewalDate');
    const postError  = document.querySelector('.posterror');
    const tellError = document.querySelector('.tellerror');
    const streetError = document.querySelector('.streeterror');
    const districtError = document.querySelector('.districterror');
    const occupationError = document.querySelector('occupationerror');

    const classes = useStyles();
    const [policyNo,setpolicyNo] = useState('');
    const [claimNo,setclaimNo]  = useState('');
    const [renewDate,setRenewalDate] = useState('');
    const [insuredName,setinsuredName] = useState('');
    const [postalAddress,setPOBOX] = useState('');
    const [tellNo,setTelNo]  =  useState('');
    const [district,setDistrict] =  useState('');
    const [street,setStreet]  =  useState('');
    const [occupation,setOccupation] =  useState('');
    const [formIdUser,setformIdUser] = useState(formId);
    const [emailUser,setEmailuser] = useState(email);  
 console.log(formIdUser,emailUser);
    
    const handleSubmit =async (e)=>{
        e.preventDefault();
        setpolicyNo('');
        setclaimNo('');
        setRenewalDate('');
        setinsuredName('');
        setinsuredName('');
        setPOBOX('');
        setTelNo('');
        setDistrict('');
        setStreet('');
        setOccupation('');
        const url = 
      `http://localhost:8080/api/v1/member/pageOne`;
        const resp = await fetch(url,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            policyNo,
            claimNo,
            renewDate,
            insuredName,
            postalAddress,
            tellNo,
            district,
            street,
            occupation,
            emailUser,
            formIdUser
          }),
          credentials: 'include',
          withCredentials:true
        })
        const data = await resp.json();
        console.log(data)
        if(data){
  const dburl =`http://localhost:8080/api/v1/form/createform`;
  const resp = await fetch(dburl,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body: JSON.stringify({
    formId,
    emailUser
})
  });
const newdata =  await resp.json();
  console.log(newdata)
        }
        if(data.message){
          alert(`${data.message}`);
          // nav('/insuredvehicle')
        }
        // console.log(data.err.code);
        // if(data.err.code === 11000){
        //   console.log('has fatal error')
        // }
       
//         if(data.errorFunction){
// policyerror.textContent = data.errorFunction.policy
// claimerror.textContent = data.errorFunction.claimNo
// renewDateError.textContent = data.errorFunction.renewDate
// insuredNameError.textContent = data.errorFunction.insuredName
// postError.textContent = data.errorFunction.postalAddress
// tellError.textContent = data.errorFunction.tellNo
// streetError.textContent = data.errorFunction.street
// districtError.textContent = data.errorFunction.district
// occupationError.textContent = data.errorFunction.occupation
//         }
      }
    const hardReload = ()=>{
        // console.log('deleted');
        setpolicyNo('');
        setclaimNo('');
        setRenewalDate('');
        setinsuredName('');
        setPOBOX('');
        setTelNo('');
        setDistrict('');
        setStreet('');
        setOccupation('');
    }

    useEffect((props)=>{
//fecth data and check if the id does exist in the data base
const getData = async ()=>{
  const url =
   `http://localhost:8080/api/v1/form/pageOne`;
  const resp =  await fetch(url,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
    formIdUser
  })
  });
  const data = await resp.json();
 console.log(data.getPagedata);
 if(data.getPagedata == null){
  console.log('data is null');
 }else{
  console.log(data.getPagedata._id);
  // data.getPagedata.map((item)=>{
    console.log(data.getPagedata._id);
  setDistrict(data.getPagedata.district);
  setpolicyNo(data.getPagedata.policyNo);
  setclaimNo(data.getPagedata.claimNo);
  setRenewalDate(data.getPagedata.renewDate);
  setinsuredName(data.getPagedata.insuredName);
  setPOBOX(data.getPagedata.postalAddress);
  setTelNo(data.getPagedata.tellNo);
  setDistrict(data.getPagedata.district);
  setStreet(data.getPagedata.street);
  setOccupation(data.getPagedata.occupation);
  //  })
 }

}
getData();
},[props.id]);
return(
<div className={classes.pageOne}>
  {/* //pass to the navbar */}
  <div className='navbar'>
{/* 
  CREATE ROUTES */}
<Link to='/personaldetails' className='navlinks' 
  state={{email:email ,formId:formId}}>
    Personal Details</Link>
  <Link to='/insuredvehicle' className='navlinks' 
  state={{  email:email ,formId:formId}}
  >The Insured Vehicle</Link>
  <Link to='/driversection' className='navlinks'
  state={{ email:email ,formId:formId}}
  >Person Driving Section</Link>
  <Link to='/accidents' className='navlinks'
  state={{  email: email ,formId:formId}}
  >Accident</Link>
   <Link to='/damages' className='navlinks'
  state={{ email:email ,formId:formId}}
  >Damages</Link>
</div>
<h2>Personal Details Section</h2>
<form onSubmit={handleSubmit}>
<div className={classes.textFields}>
<div className={classes.item}>
<TextField id="filled-basic" type='number'
label="POLICYNO"
variant="filled" 
value={policyNo}
onChange={(e)=>{
  setpolicyNo(e.target.value) 
}}
required/>
<div className='policyno' style={{color:"red"}}></div>
</div >
<div className={classes.item}>
<TextField id="filled-basic" 
type='number'
label="CLAIMNO"
variant="filled" 
value={claimNo}
onChange={(e)=>{
  setclaimNo(e.target.value) 
}}
required/>
<div className={classes.claimerror} style={{color:"red"}}></div>
</div>
<div className={classes.item}>
<TextField id="filled-basic" 
type='date'
label="RENEWALDATE"
variant="filled" 
value={renewDate}
onChange={(e)=>{
  setRenewalDate(e.target.value) 
}}
required/>
<div className='renewalerror' style={{color:"red"}}></div>
</div>
<div className={classes.item}>
<TextField id="filled-basic"
type='text'
 label="INSUREDNAME"
variant="filled" 
value={insuredName}
onChange={(e)=>{
  setinsuredName(e.target.value) 
}}
required/>
<div className='insurederror' style={{color:"red"}}></div>
</div>
</div>
<p className={classes.ptext}>
EMAIL ADDRESS</p>
<div className={classes.textFields}>
<div className={classes.item}>
<TextField id="filled-basic"
type='string'
 label="P.O.BOX"
variant="filled" 
value={postalAddress}
onChange={(e)=>{
  setPOBOX(e.target.value) 
}}
required/>
<div className='posterror'
 style={{color:"red"}}></div>
</div>
<div className={classes.item}>
<TextField id="filled-basic" 
type='number'
label="TELL NO"
variant="filled" 
value={tellNo}
onChange={(e)=>{
  setTelNo(e.target.value) 
}}
required/>
<div className='tellerror' style={{color:"red"}}></div>
</div>
<div className={classes.item}>
<TextField id="filled-basic"
type='text'
 label="STREET"
variant="filled" 
value={street}
onChange={(e)=>{
  setStreet(e.target.value) 
}}
required/>
<div className='streeterror' style={{color:"red"}}></div>
</div>
<div className={classes.item}>
<TextField id="filled-basic" 
type='text'
label="DISTRICT"
variant="filled" 
value={district}
onChange={(e)=>{
  setDistrict(e.target.value) 
}}
required/>
<div className='districterror' style={{color:"red"}}></div>
</div>
<div className={classes.item}>
<TextField id="filled-basic" 
type='text'
label="OCCUPATION"
variant="filled" 
value={occupation}
onChange={(e)=>{
  setOccupation(e.target.value) 
}}
required/>
<div className='occupationerror' style={{color:"red"}}></div>
</div>
</div>
<Button  style={{margin:"50px 15px"}}
type="submit"
variant="outlined"
size="large" className={classes.btn} >
SAVE & SUBMIT
</Button>
<span variant="outlined" className={classes.clear}
onClick={(e)=>{hardReload()}}
>
CLEAR ALL
</span>
</form>
</div>
)
}
export default Page1;