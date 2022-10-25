// /* eslint-disable eqeqeq */
// import React from 'react';
// import TextField from "@mui/material/TextField";
// import {useState} from 'react';
// import Button from "@mui/material/Button";
// import {makeStyles} from "@material-ui/core";
// import { motion } from 'framer-motion';
// import { AppWrap, MotionWrap } from '../wrapper';
// import {axios} from 'axios';

// const useStyles = makeStyles((theme) => ({
//     btn:{
//         backgroundColor:"violet",
//         '&:hover':{
//              backgroundColor:'pink'
//         }
//    },
//    fieldValue:{
//    width:"100%"
//    },
//    contactForm:{
//         display:"flex",
//         flexDirection:"column",
//         alignItems:"center",
//         justifyContent:"center",
//    }
// }));
// const MemberRegistration = ()=>{
//     let emailerror = document.querySelector(".emailerror");
//     let  nameerror = document.querySelector(".nameerror");
//     let regnoerror = document.querySelector(".regnoerror");
//     let courseerror = document.querySelector(".courseerror");
//     let yearerror = document.querySelector(".yearerror");
//     console.log(emailerror,nameerror,
//         regnoerror,
//         courseerror,
//         yearerror)
//     const [name,setname] =  useState("");
//     const [email,setemail] = useState("");
//     const [regno,setregno] = useState("");
//     const [course,setcourse] = useState("");
//     const [year,setyear] = useState("");
//  const classes = useStyles();
//  const handleSubmit = async (e)=>{
// e.preventDefault();
// setname("");
// setemail('');
// setregno('');
// setcourse('');
// setyear('');
// console.log(name,email,year,course,regno);
// const baseUrl = `http://localhost:5000/api/v1/member/register`;
// const response = await fetch(baseUrl,
//     {
// method:"POST",
// headers:{"Content-Type":"application/json"},
// body:JSON.stringify({name,email,regno,course,year}),
// credentials: 'include',
// withCredentials:true
// })
// const data = await response.json();
// console.log(data);
// if(data.newmember && response.status == 200){
// alert(`${data.newmember.email}regesterd succefully`);
// }

// if(data.errormess){
//     emailerror.textContent = data.errormess.email;
//     nameerror.textContent = data.errormess.name;
//     regnoerror.textContent = data.errormess.regno;
//     courseerror.textContent = data.errormess.course;
//     yearerror.textContent = data.errormess.year;
// }
//  }

// return(
// <div className="regesterMember">
//     <h2 style={{textAlign:"center"}}>NEW MEMBER REGISTRATION</h2> 
// <form autoComplete="off" 
// className={classes.contactForm} onSubmit={handleSubmit}>
//  <TextField type="text" 
//  className={classes.fieldValue}
//   id="name" label="full name" 
//   variant="outlined"
//  required style={{margin:"20px 0px"}} value={name}  onChange={(e)=>{
//      setname(e.target.value)
// }}/>


// <div className='nameerror' style={{color:"red"}}></div>
//  <TextField type="text"  
//  className={classes.fieldValue} id="email"
//   label="email" variant="outlined"
//  required style={{margin:"20px 0px"}} 
//  value={email}  onChange={(e)=>{
//      setemail(e.target.value)
// }}/>
// <div className='emailerror' style={{color:"red"}}></div>
// <TextField type="text"  className={classes.fieldValue} id="regno" label="regno" variant="outlined"
//  required style={{margin:"20px 0px"}} value={regno}  onChange={(e)=>{
//      setregno(e.target.value)
// }}/>
// <div className='regnoerror' style={{color:"red"}}></div>
// <TextField type="number" min="1" max="4" className={classes.fieldValue} 
// id="year" label="year of study" variant="outlined"
//  required style={{margin:"20px 0px"}} value={year}  onChange={(e)=>{
//      setyear(e.target.value)
// }}  />
// <div className='yearerror' style={{color:"red"}}></div>
// <TextField type="text"  className={classes.fieldValue
// } id="course" label="course" variant="outlined"
//  required style={{margin:"20px 0px"}} 
//  value={course}  onChange={(e)=>{
//      setcourse(e.target.value)
// }}/>
// <div className='courseerror' style={{color:"red"}}></div>
// <Button  style={{margin:"10px 0px"}}
//  type="submit"
//  variant="outlined"
//  size="large" className={classes.btn}>
// REGESTER MEMBER
// </Button>
// </form>  
// </div>
// )
// }
// export default AppWrap(
//     MotionWrap(MemberRegistration, ''),
//     'newmember',
//     'app__whitebg',
//   );