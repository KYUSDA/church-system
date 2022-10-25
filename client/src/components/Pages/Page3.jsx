import React from 'react';
import TextField from '@mui/material/TextField';
import {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Navbar from './Navbar';
import "../Navbar/Navbar.css"
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
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
const PageThree = (props)=>{
  const location = useLocation()
  const {email } = location.state;
  const {formId} = location.state;
    const classes = useStyles();
    const nav = useNavigate();
    const [namePers,setnamePers] = useState('');
    const [address,setaddress] = useState('');
    const [age,setAge] = useState('');
    const [occupation,setOccupation] = useState('');
    const [licenseNo,setlicenseno] = useState('');
    const [dateofIssue,setdateissued] = useState('');
    const [placeIssue,setplaceissued]  = useState('');
    const [dateofExpiray,setdateexpiray]  = useState('');
    const [renewalNo,setrenewalNo]  = useState('');
    const [typeLicense,settypeLicense] = useState('');
const [validUpto,setvalidUpto] = useState('');
const [statusDriver,setstatusDriver]  = useState('');
const [statusLicenses,setstatusLicense]  = useState('');
const [driverProsecuted,setdriverProsecuted] = useState('');
const [priorAccident,setpriorAccident] = useState('');
const [driverInsurance,setdriverInsurance] = useState('');
const [driverExpirience,setdriverExperience] = useState('');
const [anyotherInsurance,setanyotherInsurance]   = useState('');
const [sobberness,setsobberness]  = useState('');
const [emailUser,setemailUser] = useState(email);
const [formIdUser,setformIdUser] = useState(formId);

     //handlesubmit function
     const handleSubmit = async(e)=>{
e.preventDefault();
const url  = `http://localhost:8080/api/v1/member/pageThree`;
const resp = await fetch(url,{
  method:"POST",
  headers:{ "Content-Type": "application/json" },
  body:JSON.stringify({namePers,address,age,occupation,licenseNo,dateofIssue,
    placeIssue,
    dateofExpiray,
    renewalNo,
    typeLicense,
    validUpto,
    statusDriver,
    statusLicenses,
    driverProsecuted,
priorAccident,
driverInsurance,
driverExpirience,
sobberness,
anyotherInsurance,
emailUser,
formIdUser
  })
});
const data = await resp.json();
if(data.message){
  console.log(data.message);
  alert(`${data.message}`);
}
     }

     //fecth data  check for the id in database if matches with
useEffect(()=>{
  console.log(formId);
  const getData = async()=>{
    const dburl =`http://localhost:8080/api/v1/form/pageThree`;
    const resp = await fetch(dburl,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      formIdUser
  })
    });
    const data = await resp.json();
    console.log(data.getPagedata);
    if(data.getPagedata == null){
      console.log('is null no data')
    }else{
      // data.getPagedata.map((item)=>{
        setnamePers(data.getPagedata.namePers);
        setaddress(data.getPagedata.address);
      setAge(data.getPagedata.age);
      setOccupation(data.getPagedata.occupation);
      setlicenseno(data.getPagedata.licenseNo);
      setdateissued(data.getPagedata.dateofIssue);
      setplaceissued(data.getPagedata.placeIssue);
      setdateexpiray(data.getPagedata.dateofExpiray);
      setrenewalNo(data.getPagedata.renewalNo);
      settypeLicense(data.getPagedata.typeLicense)
      setvalidUpto(data.getPagedata.validUpto)
      setstatusDriver(data.getPagedata.statusDriver)
      setstatusLicense(data.getPagedata.statusLicenses)
      setdriverProsecuted(data.getPagedata.driverProsecuted)
      setpriorAccident(data.getPagedata.priorAccident)
      setdriverInsurance(data.getPagedata.driverInsurance)
      setdriverExperience(data.getPagedata.driverExpirience)
      setanyotherInsurance(data.getPagedata.anyotherInsurance)
      setsobberness(data.getPagedata.sobberness);
      //  })
    }
  }
  getData();
  },[props.id]);
     return(
<div>
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
<h1 className={classes.ptext}>
Person Driving at the time of accident
</h1>
<form onSubmit={handleSubmit}>
<div className={classes.textFields}>
<div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Driver"
variant="filled" 
value={namePers}
onChange={(e)=>{
  setnamePers(e.target.value) 
}}
required/>
<div className='drivererro' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Address"
variant="filled" 
value={address}
onChange={(e)=>{
  setaddress(e.target.value) 
}}
required/>
<div className='addresserror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Age"
variant="filled" 
value={age}
onChange={(e)=>{
  setAge(e.target.value) 
}}
required/>
<div className='ageerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Occupation"
variant="filled" 
value={occupation}
onChange={(e)=>{
  setOccupation(e.target.value) 
}}
required/>
<div className='occupationerror' style={{color:"red"}}></div>
  </div>
  </div>
  <p style={{textAlign:'center',color:'blue'}}>
      Particulars of Driving License</p>
  <div className={classes.textFields}>
<div className={classes.item}>
<TextField id="filled-basic" type='number'
label="LICENSE NO"
variant="filled" 
value={licenseNo}
onChange={(e)=>{
  setlicenseno(e.target.value) 
}}
required/>
<div className='licenseerror' style={{color:"red"}}></div>
  </div>

  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="PLACE OF ISSUED"
variant="filled" 
value={placeIssue}
onChange={(e)=>{
  setplaceissued(e.target.value) 
}}
required/>
<div className='placerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="TYPE LICENSE"
variant="filled" 
value={typeLicense}
onChange={(e)=>{
  settypeLicense(e.target.value) 
}}
required/>
<div className='typeerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='number'
label="RENEWAL NO"
variant="filled" 
value={renewalNo}
onChange={(e)=>{
  setrenewalNo(e.target.value) 
}}
required/>
<div className='renewalerror' style={{color:"red"}}></div>
  </div>
  </div>
  <div className={classes.textFields}>
  <div className={classes.item}>
    <p>Valid upto</p>
<TextField id="filled-basic" type='date'
variant="filled" 
value={validUpto}
onChange={(e)=>{
  setvalidUpto(e.target.value) 
}}
required/>
<div className='validityerror' style={{color:"red"}}></div>
  </div>

  <div className={classes.item}>
    <p> Date of Expiry</p>
<TextField id="filled-basic" type='date'
variant="filled" 
value={dateofExpiray}
onChange={(e)=>{
  setdateexpiray(e.target.value) 
}}
required/>
<div className='expiryerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<p>Date Issued</p>
<TextField id="filled-basic" type='date'
variant="filled" 
value={dateofIssue}
onChange={(e)=>{
  setdateissued(e.target.value) 
}}
required/>
<div className='issuederror' style={{color:"red"}}></div>
  </div>
  </div>
  <p style={{textAlign:'center',color:'blue'}}>
      DRIVERS DETAILS </p>
      <div className={classes.textFields}>
<div className={classes.item}>
  <p>Is he your permanent driver</p>
<TextField id="filled-basic" type='text'
label="IS HE YOUR DRIVER"
variant="filled" 
value={statusDriver}
onChange={(e)=>{
  setstatusDriver(e.target.value) 
}}
required/>
<div className='statusdrivererror' style={{color:"red"}}></div>
  </div>

  <div className={classes.item}>
    <p>Has driver license ever been suspended</p>
<TextField id="filled-basic" type='text'
label="STATUS LICENSE"
variant="filled" 
value={statusLicenses}
onChange={(e)=>{
  setstatusLicense(e.target.value) 
}}
required/>
<div className='statuserror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
    <p>Driver ever been prosecuted </p>
<TextField id="filled-basic" type='text'
label="DRIVER EVER BEEN PROSECUTED"
variant="filled" 
value={driverProsecuted}
onChange={(e)=>{
  setdriverProsecuted(e.target.value) 
}}
required/>
<div className='prosecutederror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
    <p>Ever been involved in accident</p>
<TextField id="filled-basic" type='text'
label="EVER BEEN INVOLVED IN ACCIDENT"
variant="filled" 
value={priorAccident}
onChange={(e)=>{
  setpriorAccident(e.target.value) 
}}
required/>
<div className='accidenterror' style={{color:"red"}}></div>
  </div>
  </div>
  <div className={classes.textFields}>
<div className={classes.item}>
  <p>Ever been denied motor vehicle insurance</p>
<TextField id="filled-basic" type='text'
label="Driver insurance denied"
variant="filled" 
value={driverInsurance}
onChange={(e)=>{
  setdriverInsurance(e.target.value) 
}}
required/>
<div className='deniederror' style={{color:"red"}}></div>
  </div>

  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="DRIVER EXPERIENCE"
variant="filled" 
value={driverExpirience}
onChange={(e)=>{
  setdriverExperience(e.target.value) 
}}
required/>
<div className='expererror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Any other insurance"
variant="filled" 
value={anyotherInsurance}
onChange={(e)=>{
  setanyotherInsurance(e.target.value) 
}}
required/>
<div className='prosecutederror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Was he sober"
variant="filled" 
value={sobberness}
onChange={(e)=>{
  setsobberness(e.target.value) 
}}
required/>
<div className='sobbererror' style={{color:"red"}}></div>
  </div>
  </div>
<Button  style={{margin:"50px 15px"}}
type="submit"
variant="outlined"
size="large" className={classes.btn} >
SAVE & SUBMIT
</Button>
<span variant="outlined" className={classes.clear}>
CLEAR ALL
</span>
    </form>

 </div>
    )

}
export default PageThree;
