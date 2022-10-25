import React from 'react'
import {useState,useEffect} from 'react'
import {makeStyles} from '@material-ui/core';
import {useLocation} from 'react-router-dom';

function GetpageOne(props) {
    const [data,setdata] = useState();
    const location = useLocation();
    const {email} = location.state
    console.log(email);
    useEffect(()=>{
    const getPersonalinfo = async (props)=>{
    const url = `http://localhost:8080/api/v1/member/getinfo`;
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
data.pageOnedata.map(item=>(
<div className='pageOne Data' key={item._id}>
<h1>Personal Details</h1>
<div>Claim Number:{item.claimNo}</div>
<div>District:{item.district}</div>
<div>Email User:{item.emailUser}</div>
<div>Insured to:{item.insuredName}</div>
<div>Occupation:{item.occupation}</div>
<div>Policy:{item.policyNo}</div>
<div>Postal Address:{item.postalAddress}</div>
<div>Renewal Date:{item.renewDate}</div>
<div>Street:{item.street}</div>
<div>Telephone:{item.tellNo}</div>
</div>
))
}
<div>
</div>
</div> 
    )
  }
}

export default GetpageOne