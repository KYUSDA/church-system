import React from 'react'
import {useState,useEffect} from 'react'
import {makeStyles} from '@material-ui/core';
import {useLocation} from 'react-router-dom';

function Getpagethree(props) {
    const [data,setdata] = useState();
    const location = useLocation();
    const {email} = location.state
    useEffect(()=>{
    const getPersonalinfo = async (props)=>{
    const url = `http://localhost:8080/api/v1/member/getpagethree`;
    const resp = await fetch(url,{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email}),
    credentials: 'include',
    withCredentials:true
     });
const newdata = await resp.json();
setdata(newdata); 
        }
        getPersonalinfo();
},[props.id])
if(data){
    console.log(data)
    return(
   <div className='myData'>
{
data.pageThreedata.map(item=>(
<div className='pageOne Data' key={item._id}>
<h1>Driver Details</h1>
<div>Driver Name:{item.namePers}</div>
<div>Address:{item.address}</div>
<div>Age:{item.age}</div>
<div>Driver occupation:{item.occupation}</div>
<div>License No:{item.licenseNo}</div>
<div>Date of Issue:{item.dateofIssue}</div>
<div>dateofExpiray:
{item.dateofExpiray
}</div>
<div>Renewal No:{item.
renewalNo}</div>
<div>Valid upto{item.validUpto}</div>
<div>Type License:{item.typeLicense}</div>
<div>Status of Driver{item.vstatusDriver}</div>
<div>Sttatus of License:{item.statusLicenses}</div>
<div>Driver ever Prosecuted:{item.driverProsecuted}</div>
<div>Any Prior Accident:{item.priorAccident}</div>
<div>Driver Insurance:{item.driverInsurance}</div>
<div>Driver Experience:{item.driverExpirience}</div>
<div>Any other insurance:{item.anyotherInsurance}</div>
<div>Was he/she sobber:{item.sobberness}</div>
</div>
))
}
<div>
</div>
</div> 
    )
  }
}

export default Getpagethree