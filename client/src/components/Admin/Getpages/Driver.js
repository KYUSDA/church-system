import React from 'react';
import {useState,useEffect} from 'react';
import './getpages.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
function Driver(props) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));
    const [data,setData] = useState();
    //search a member and get detail
    useEffect(()=>{
      const id = props.formId;
      console.log(props.formId)
        const getPersonal = async ()=>{
      const baseUrl =
      `http://localhost:8080/api/v1/admin/driverdetails`
            const resp = await fetch(baseUrl,{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body: JSON.stringify({
                id
            })
            });
            const newdata = await resp.json();
            setData(newdata)
                };
                getPersonal();
    },[props.id])
    if(data){
      console.log(data);
return(
  <div>
       <Grid item xs={12}>
    <Item style={{textAlign:'center'}}>
    <p className='title'>Driver details</p>
    </Item>
</Grid>
    {data.getPagedata.map((item)=>(
      <div className='pageContent' key={item._id}
      style={{margin:"20px auto"}}>
      <Grid container spacing={2} columns={12}>
      <Grid item xs={4}>
    <Item >Full Name of Person</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.namePers}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item >Address</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.address}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>His Age</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.age}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>His Occupation</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.occupation}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>License No</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.licenseNo}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Date of Issue</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.dateofIssue}</Item>
  </Grid> 
  <Grid item xs={4}>
    <Item>place of Issue</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.placeIssue}</Item>
  </Grid>    
  <Grid item xs={4}>
    <Item>Date of Expiry</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.dateofExpiry}</Item>
  </Grid>   
  <Grid item xs={4}>
    <Item>Renwal No</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.renewalNo}</Item>
  </Grid>     
  <Grid item xs={4}>
    <Item>Valid up to</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.validUpto}</Item>
  </Grid> 
  <Grid item xs={4}>
    <Item>Type of license</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.typeLicense}</Item>
  </Grid> 
  <Grid item xs={4}>
    <Item>Is he your permanent paid driver</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.statusDriver}</Item>
  </Grid> 
  <Grid item xs={4}>
    <Item>Has driver's license ever been endorsed or suspended</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.statusLicenses}</Item>
  </Grid> 
  <Grid item xs={4}>
    <Item>The driver has ever been prosecuted for driving offences</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.driverProsecuted}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>The driver has been involved in any accidenst previously.</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.priorAccident}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>The driver has been refused motor vehicles insurance or conitnuance therof</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.driverInsurance}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>How long has he been driving motor vehicle</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.driverExpirience}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Has the driver had anyother insurance of his own</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.anyotherInsurance}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Was he sober</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.sobberness}</Item>
  </Grid>
        </Grid>   
<div>
  </div>
        </div>
    ))}
  </div>
)
    }else{
      return (
        <div>
          <p>
          No details found for page Three
          </p>
        </div>
      )
    }
}

export default Driver