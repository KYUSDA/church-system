import React from 'react';
import {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme)=>({
    approved:{
        display:'flex',
        justifyContent:'center',
      alignItems:'center'
    },
    links:{
margin:"20px 15px"
},
}))
function Approved(props) {
    const classes = useStyles();
    const [data,setData] = useState("");
    const sendDeclineDetails = async (props)=>{
const email = props;
console.log(props);
//fetch the user
try{
const url = `http://localhost:8080/api/v1/admin/disapproved`;
const resp =  await fetch(url,{
method:'POST',
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email}),
credentials: 'include',
withCredentials:true
 });
    const getMember = await resp.json();
    console.log(getMember);
    if(getMember.message){
        alert(`${getMember.message}`);
    }
}catch(err){
console.log(err);
}
};
    useEffect(()=>{
const getApprovedMembers = async()=>{
const baseUrl  = `http://localhost:8080/api/v1/admin/approved`;
const resp = await fetch(baseUrl);
const newMember = await resp.json();
setData(newMember);
    };
    getApprovedMembers();
    },[props.id])
if(data){
    return (
        <div className='approved'>
    <h2 style={{testAlign:'center'}}>Approved Members</h2>
<div className={classes.links}>
<Link to='/adminpage' style={{textDecoration:'none',margin:'10px'}}>Admin Page</Link>
<Link to='/regestered' style={{textDecoration:'none',margin:'10px'}}>Regestered</Link>
<Link to='/disapproved' style={{textDecoration:'none',margin:'10px'}}>Disaproved</Link>
</div>
<div className={classes.approved}> 
<table>
            <tbody>
            <tr>
            <th>Name</th>
            <th>Email</th>
            </tr>
            </tbody>
            {data.getApproved.map((item=>(
            <tbody>
        <tr key={item._id}>
        <td>Name:{item.name}</td>
        <td>Email:{item.email}</td>
         </tr>
        </tbody>
            )))}
            </table>
        </div>
        </div>
      )
}else{
    return(
<div> YOU HAVENT APPROVED ANY MEMBER YET</div>
    )
}

}

export default Approved