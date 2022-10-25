import React from 'react';
import TextField from '@mui/material/TextField';
import {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import "../Navbar/Navbar.css"
import {useNavigate,useLocation,Link} from 'react-router-dom';
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
const Page4 = (props)=>{
    const classes = useStyles();
    const nav = useNavigate();
    const location = useLocation()
    const {email} = location.state;
    const {formId} = location.state;
    const [dateOccurence,setdateOccurence] = useState('');
    const [time,settime] = useState('');
    const [place,setplace] = useState('');
    const [yourLocation,setLocation] = useState('');
    const [positionVehicle,setpositionVehicle] = useState('');
    const [widthStreet,setwidthStreet] = useState('');
    const [speedBefore,setspeedBefore] = useState('');
    const [speedDuring,setspeedDuring] = useState('');
    const [vehicleLocked,setvehicleLocked] = useState('');
    const [antitheft,setantitheft] = useState('');
    const [natureAccident,setnatureAccident] = useState('');
    const [causeAccident,setcauseAccident] = useState('');
    const [sketchScene,setsketch]  = useState('');
    const [emailUser,setemailUser] = useState(email);
    const [formIdUser,setformIdUser] = useState(formId);
    const handleSubmit = async(e)=>{
e.preventDefault();
const url = `http://localhost:8080/api/v1/member/pageFour`;
const resp = await fetch (url,{
    method:"POST",
    headers:{ "Content-Type": "application/json" },
    body:JSON.stringify ({
dateOccurence,
time,
place,
yourLocation,
positionVehicle,
widthStreet,
speedBefore,
speedDuring,
vehicleLocked,
antitheft,
natureAccident,
causeAccident,
sketchScene,
emailUser,
formIdUser
    })
})
const data = await resp.json();
if(data.message){
    alert(`${data.message}`);
    // nav('/damages')
}
    }
    useEffect(()=>{
      //fecth data and check if the id does exist in the data base
      const getData = async ()=>{
        const url =
         `http://localhost:8080/api/v1/form/pageFour`;
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
          setdateOccurence(data.getPagedata.dateOccurence)
          settime(data.getPagedata.time)
          setplace(data.getPagedata.place)
          setLocation(data.getPagedata.location)
          setpositionVehicle(data.getPagedata.positionVehicle)
          setwidthStreet(data.getPagedata.widthStreet)
          setspeedBefore(data.getPagedata.speedBefore)
          setspeedDuring(data.getPagedata.speedDuring)
          setvehicleLocked(data.getPagedata.vehicleLocked)
          setantitheft(data.getPagedata.antitheft)
          setnatureAccident(data.getPagedata.natureAccident)
          setcauseAccident(data.getPagedata.causeAccident)
          setsketch(data.getPagedata.sketchScene)
       }
      
      }
      getData();
      },[props.id]);   

    return(
<div className=''>
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
<h1 className={classes.ptext} >
The accident 
 <span style={{color:'green'}}>
 Theft,fire,Damage
</span>
</h1>
<form onSubmit={handleSubmit}>
<div className={classes.textFields}>
<div className={classes.item}>
    <p>When did the accident happen</p>
<TextField id="filled-basic" type='date'
label=""
variant="filled" 
value={dateOccurence}
onChange={(e)=>{
  setdateOccurence(e.target.value) 
}}
required/>
<div className='dateerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="At what Time"
variant="filled" 
value={time}
onChange={(e)=>{
  settime(e.target.value) 
}}
required/>
<div className='timeerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="At what place"
variant="filled" 
value={place}
onChange={(e)=>{
  setplace(e.target.value) 
}}
required/>
<div className='placeerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Were you in the vehicle"
variant="filled" 
value={yourLocation}
onChange={(e)=>{
  setLocation(e.target.value) 
}}
required/>
<div className='locationerror' style={{color:"red"}}></div>
  </div>
  </div>
  <div className={classes.textFields}>
<div className={classes.item}>
    <p>Which side of the street
         <br/> was your vehicle
        and how long far from kerb
    </p>
<TextField id="filled-basic" type='text'
label=""
variant="filled" 
value={positionVehicle}
onChange={(e)=>{
  setpositionVehicle(e.target.value) 
}}
required/>
<div className='positionerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Width of the street or road"
variant="filled" 
value={widthStreet}
onChange={(e)=>{
  setwidthStreet(e.target.value) 
}}
required/>
<div className='widtherror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Speed of Vehicle before accident"
variant="filled" 
value={speedBefore}
onChange={(e)=>{
  setspeedBefore(e.target.value) 
}}
required/>
<div className='spbeforeerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Speed During Accident"
variant="filled" 
value={speedDuring}
onChange={(e)=>{
  setspeedDuring(e.target.value) 
}}
required/>
<div className='spduringerror' style={{color:"red"}}></div>
  </div>
  </div>
  <p style={{textAlign:'center',color:'blue'}}>
      Incase of Theft</p>
      <div className={classes.textFields}>
<div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Was vehicle door locked"
variant="filled" 
value={vehicleLocked}
onChange={(e)=>{
  setvehicleLocked(e.target.value) 
}}
required/>
<div className='lockederror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Is fitted with any antitheft"
variant="filled" 
value={antitheft}
onChange={(e)=>{
    setantitheft(e.target.value) 
}}
required/>
<div className='antithefterror' style={{color:"red"}}></div>
  </div>

  </div>
  <div className={classes.textFields}>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="What was the cause of accident"
variant="filled" 
value={causeAccident}
onChange={(e)=>{
  setcauseAccident(e.target.value) 
}}
required/>
<div className='causeerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Explain nature Accident"
variant="filled" 
value={natureAccident}
onChange={(e)=>{
  setnatureAccident(e.target.value) 
}}
required/>
<div className='natureerror' style={{color:"red"}}></div>
  </div>
  <div className={classes.item}>
<TextField id="filled-basic" type='text'
label="Enter sketch"
variant="filled" 
value={sketchScene}
onChange={(e)=>{
  setsketch(e.target.value) 
}}
required/>
<div className='sketcherror' style={{color:"red"}}></div>
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
export default Page4;