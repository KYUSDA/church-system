import React from 'react'
import TextField from "@mui/material/TextField";
import {useState} from 'react';
import Button from "@mui/material/Button";
import {makeStyles} from "@material-ui/core";
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

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
   navbar:{
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'flex-end',
   },
   home:{
    backgroundColor:'yellow',
    padding:'5px',
    textDecoration:'none',
    cursor:'pointer',
    fontSize:'1.5rem'
   }

}));

function Login() {
    const classes = useStyles();
    const nav = useNavigate();
    let emailerror = document.querySelector(".emailerror");
    let passworderror = document.querySelector(".passworderror");
    let passwordconferror = document.querySelector(".passwordconferror");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [passwordconfirm,setpasswordConfirm] = useState("");
    const handleSubmit = async(e)=>{
e.preventDefault();
setemail("");
setpassword("");
setpasswordConfirm("");
console.log(email,password)
const baseUrl = `http://localhost:5000/api/v1/admin/login`;
const resp = await fetch(baseUrl,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password,passwordconfirm}),
    credentials:'include',
    withCredentials:true
})
const data = await resp.json();
console.log(data.admin.email);
if(data.admin && resp.status == 200){
    alert(`welcome back Admin : ${data.admin.email} `);
 nav("/Getmembers")
    }
if(data.errMess){
    emailerror.textContent = data.errMess.email;
    passworderror.textContent = data.errMess.password;
    passwordconferror.textContent = data.errMess.passwordconfirm;
    }
}
  return (
<div className="adminlogin">
    <div className={classes.navbar}>
        <ul  className={classes.home}>
            <Link to="/" style={{textDecoration:'none'}}>
                HOME</Link>
        </ul>
    </div>
    <h2 style={{textAlign:"center"}}>
    ADMIN LOGIN</h2> 
<form autoComplete="off" 
onSubmit={handleSubmit} className={classes.contactForm}>
 <TextField type="text"  
 className={classes.fieldValue} id="email"
  label="email" variant="outlined"
 required style={{margin:"20px 0px"}} 
 value={email}  onChange={(e)=>{
     setemail(e.target.value)
}}/>
<div className='emailerror'></div>
<TextField type="text"  
 className={classes.fieldValue} id="password"
  label="password" variant="outlined"
 required style={{margin:"20px 0px"}} 
 value={password} onChange={(e)=>{
     setpassword(e.target.value)
}}/>
<div className='passworderror' style={{color:"red"}}></div>
<TextField type="text"  
 className={classes.fieldValue} id="passwordconfirm"
  label="passwordconfirm" variant="outlined"
 required style={{margin:"20px 0px"}} 
 value={passwordconfirm} onChange={(e)=>{
     setpasswordConfirm(e.target.value)
}}/>
<div className='passwordconferror' style={{color:"red"}}></div>
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
export default Login;
