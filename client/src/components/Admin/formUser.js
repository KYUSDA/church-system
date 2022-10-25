import React from 'react'
import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import PersonalDetails from './Getpages/Personaldetails';
import Vehicledetails from './Getpages/vehicleDetails';
import Driverdetails from './Getpages/Driver';
import Accidentdetails from './Getpages/Accidents';
import Damagesdetails from './Getpages/Damagesdetails';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import '../Admin/formdetail.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
function formUser(props) {
    const location = useLocation();
    const id = location.state;
    const myIdentifier = id.formId;
console.log(myIdentifier);
useEffect(()=>{
    const url = `http://localhost:8080/api/v1/admin/formdatas`

},[props.id])
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item md={8} xs={12}>
        <Item>
        <p>MAYFAIR INSURANCE COMPANY LIMITED</p>
        <p>8th Floor mayfair center ,Ralph Bunche road</p>
        <p>TEL:07202999 000, FAX +254 20 2999 111 MOBILE:+254 7333/724 256925</p>
        <p>EMAIL:info@mayfair.co.ke</p>
        </Item>
      </Grid>
      <Grid item md={4} xs={12}>
        <Item>xs=4</Item>
      </Grid>
    </Grid>
    <Grid item xs={12}>
        <Item>
         <p style={{fontWeight:'bolder',marginTop:"20PX",color:'green'}}>
          MOTOR VEHICLE CLAIM FORM</p>
          </Item>
      </Grid>
<div style={{margin:'20px 40px'}} className='formItem'>
<PersonalDetails formId={myIdentifier}/>
</div>
<div style={{margin:'20px 40px'}} className='formItem'>
<Vehicledetails formId={myIdentifier}/>
</div >
<div style={{margin:'20px 40px'}} className='formItem'>
<Driverdetails formId={myIdentifier}/>
</div>
<div  style={{margin:'20px 40px'}} className='formItem'>
<Accidentdetails formId={myIdentifier}/>
</div>
<div style={{margin:'20px 40px'}} className='formItem'>
  <Damagesdetails formId={myIdentifier}/>
</div>
  </Box>
  )
}

export default formUser