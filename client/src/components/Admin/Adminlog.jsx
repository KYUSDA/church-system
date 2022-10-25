import React, { useEffect } from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import {makeStyles} from '@material-ui/core';
import {useNavigate,Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {useLocation} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  btn:{
      backgroundColor:"violet",
      '&:hover':{
           backgroundColor:'pink'
      }
 },
 fieldValue:{
 width:"50%"
 },
 contactForm:{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
 },
 Links:{
  display:'flex',
  flexWrap:'wrap',
  justifyContent:'flex-end',
  alignItems:'flex-end',
  marginRight:'20px'
}
}));
function Adminlog(props) {
    const classes = useStyles();
    const nav = useNavigate();
    const location = useLocation() ;
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [passwordconfirm,setpasswordconfirm] = useState('');
    const emailerror = document.querySelector('.emailerror');
    const passworderror = document.querySelector('.passworderror');
    const passwordconferror = document.querySelector('.passwordconferror');
    const [adminStatus,setadminStatus] = useState('');
    //check the token if is admin
    //compare passowrd
//     useEffect(()=>{
//       const checkUser = async()=>{
//         const {token} = location.state;
//         console.log(token);
//         const url = `http://localhost:8080/api/v1/admin/getToken`;
//         const getRole = await fetch(url,{
//           method:'POST',
//           headers:{"Content-Type":"application/json"},
//           body:JSON.stringify({token}),
//           credentials: 'include',
//           withCredentials:true
//         });
//     const newdata = await getRole.json();
//     setadminStatus(newdata);
//     console.log(newdata.message);
//     console.log(newdata.redirectedPage);
//     console.log(newdata.status);
//       }
// checkUser()
//     },[props.id])
// if(adminStatus.status === 'success' && adminStatus.redirectedPage === 'adminpage'){
//   // console.log(adminStatus);
//   nav(`/${adminStatus.redirectedPage}`);
// }
const handleSubmit =async (e)=>{
e.preventDefault();
setemail('');
setpassword('');
setpasswordconfirm('');
const url = `http://localhost:8080/api/v1/admin/login`;
const resp = await fetch(url,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({email,password}),
  credentials: 'include',
  withCredentials:true
})
const data = await resp.json();
console.log(data)
if(data.admin){
  alert(`Welcome back admin: ${data.admin.email} logged in Succesfuly`);
  nav('/adminpage');
}

if(data.errMess){
emailerror.textContent = data.errMess.email;
passworderror.textContent = data.errMess.password;
}
    }
  return (
    <div className='adminLogin'>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
      style={{ background: '#009100' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" 
          sx={{ flexGrow: 1 }}>
          Admin Login
          </Typography>
          <Link to='/' color="inherit" 
          style={{textDecoration:'none',fontSize:"18px",
          backgroundColor:'#a52df5',padding:'5px',fontWeight:'bolder'}}>
            Home</Link>
        </Toolbar>
      </AppBar>
    </Box>
<form className={classes.contactForm} onSubmit={handleSubmit}>
<TextField type="email" 
 className={classes.fieldValue}
  id="email" label="email" 
  variant="outlined"
 required style={{margin:"20px 0px"}} value={email} 
  onChange={(e)=>{
  setemail(e.target.value)
}}/>
<div className='emailerror' style={{color:"red"}}></div>
<TextField type="text" 
 className={classes.fieldValue}
  id="password" label="password" 
  variant="outlined"
 required style={{margin:"20px 0px"}} value={password} 
  onChange={(e)=>{
     setpassword(e.target.value)
}}/>
<div className='passworderror' style={{color:"red"}}></div>
<Link to='/forgotpassword'> Forgot password</Link>
<Button  style={{margin:"10px 0px"}}
 type="submit"
 variant="outlined"
 size="large" className={classes.btn}>
LOGIN
</Button>
</form>
    </div>
  )
}

export default Adminlog