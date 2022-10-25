import React from 'react';
import {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme)=>({
    regestered:{
        display:'flex',
        justifyContent:'center',
      alignItems:'center'
    },
    links:{
margin:"20px 15px"
},
}))
function Regestered(props) {
const [data,setData] = useState("");
const classes = useStyles();
const handleClick = async (props)=>{
const email = props;
console.log(props);
//fetch the user
try{
const url = `http://localhost:8080/api/v1/admin/approved`;
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
const getMembers = async (props)=>{
const baseUrl =
 `http://localhost:8080/api/v1/admin/getmembers`
const resp = await fetch(baseUrl);
const newdata = await resp.json();
console.log(newdata);
setData(newdata)
    };
getMembers();
},[props.id])

if(data){
    console.log(data);
    return (
        <div>
        <h2 style={{testAlign:'center'}}>Regestered Members</h2>
        <div className={classes.links}>
<Link to='/' style={{textDecoration:'none',margin:'10px'}}>Home</Link>
<Link to='/approved' style={{textDecoration:'none', margin:'10px'}}>Approved</Link>
<Link to='/disapproved' style={{textDecoration:'none', margin:'10px'}}>Disaproved</Link>
</div>
        <div className={classes.regestered}> 
        <table>
            <tbody>
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Approve</th>
            <th>Decline</th>
            </tr>
            </tbody>
            {data.regestered.map((item=>(
            <tbody>
        <tr key={item._id}>
        <td>Name:{item.name}</td>
        <td>Email:{item.email}</td>
        <td onClick={()=>handleClick(item.email)}
        style={{backgroundColor:'yellow',
        textDecoration:'none',
        margin:'0px 3px',
        cursor:'pointer'
        }}>
     Approve</td>
        <td onClick={()=>sendDeclineDetails(item.email)} 
        style={{backgroundColor:'red',
        textDecoration:'none',
        margin:'0px 3px',
        cursor:'pointer'
        }}>Decline</td>
         </tr>
        </tbody>
            )))}
            </table>
       </div>
       </div>
      )
}else{
    return(
        <div> NO MEMBER HAS REGESTERED YET</div>
    )
}
}

export default Regestered