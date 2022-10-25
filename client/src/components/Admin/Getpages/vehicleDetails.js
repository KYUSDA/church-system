import React from 'react'
import {useState,useEffect} from 'react';
import './getpages.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
function vehicleDetails(props) {
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
      const baseUrl =`http://localhost:8080/api/v1/admin/vehicledetails`
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
    <p className='title'>Vehicle details</p>
    </Item>
</Grid>
  
    {data.getPagedata.map((item,key)=>(
      <div className='pageContent' 
      key={item._id} style={{margin:"20px auto"}}>
    <Grid container spacing={2} columns={12}>
    <Grid item xs={4}>
    <Item >Car make</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.make}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item >Vehicle Horse power</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.horsepw}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Car Regestration number</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.regno}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Price paid by the insured</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.price}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Year of manufacture</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.yearmanu}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Date of Purchase</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.datepurch}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>State wheather new or Old</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.stateVehicle}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>State puprose for which it was being used at the time of accident</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.purposeVehicle}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Age</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.age}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Was it in proper order and condition at the time of accident</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.order}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Mileage at the time of accident/theft/fire</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.mileage}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Was vehicle beng used with your knowledge and consent</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.knowledge}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>
      If claim is in respect to motor cycle,
      state wheather a pillion passenger was being carried at time of accident?</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.passenger}</Item>
  </Grid>
  <Grid item xs={4}>
    <p>If claim is in respect to lorry state:</p>
    <Item>
     Wheather a trailer was hauled</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.hauled}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>
     The nature of goods carried at the time off accident</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.nature}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>
  The weight of the load carried at the time of accident</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.weight}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>
  Name of the owner of goods</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.goodsOwner}</Item>
  </Grid>
         </Grid>
        </div>
    ))}
  </div>
)
    }else{
      return (
        <div>
          <p>
          No details found for page two
          </p>
        </div>
      )
    }
}

export default vehicleDetails