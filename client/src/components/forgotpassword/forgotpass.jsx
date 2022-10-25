import React from 'react';
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
function Adminlog() {
    const classes = useStyles();
    const nav = useNavigate();
    const [email,setemail] = useState('');
    const emailerror = document.querySelector('.emailerror');
    const handleSubmit =async (e)=>{
e.preventDefault();
setemail('');
const url = `http://localhost:8080/api/v1/admin/forgotpassword`;
const resp = await fetch(url,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({email}),
  credentials: 'include',
  withCredentials:true
})
const data = await resp.json();
console.log(data);
if(data){
alert(`${data.message} check your email`)
}
    }
  return (
    <div className='adminLogin'>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#009100' }}>
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
        Forgot your password,enter email to receive your reset password
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
<Button  style={{margin:"10px 0px"}}
 type="submit"
 variant="outlined"
 size="large" className={classes.btn}>
SUBMIT
</Button>
</form>
    </div>
  )
}

export default Adminlog