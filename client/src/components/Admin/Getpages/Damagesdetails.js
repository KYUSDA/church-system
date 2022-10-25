import React from 'react'
import {useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './getpages.css'
function Damagesdetails(props) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));
    const [data,setData] = useState();
    useEffect(()=>{
        const id = props.formId;
        console.log(props.formId)
          const getPersonal = async ()=>{
        const baseUrl =
        `http://localhost:8080/api/v1/admin/damagesDetails`
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
    <p className='title'>Damages details</p>
    </Item>
</Grid>
      {data.getPagedata.map((item)=>(
        <div className='' key={item._id}>
           <Grid container spacing={2} columns={12}>
           <Grid item xs={4}>
    <Item >Give in Details the extend of all damages</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.damagesDetails}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item >Estimated cost of Repairs</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.costRepairs}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Where can the vehicle be inspected</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.pointofInspection}</Item>
  </Grid>   
  <Grid item xs={4}>
    <Item>Have you given instructions for repairs</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.repairInstruction}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Name of the person you have given instructions to</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.nameofMechanic}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Address of Mechanic</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.addressofMechanic}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Have you instructed them to send an estimate to the company</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.anyEstimate}</Item>
  </Grid>
  <Grid item xs={4}>
    <Item>Estimated form</Item>
  </Grid>
  <Grid item xs={8}>
    <Item style={{textAlign:'center'}}>{item.estimateForm}</Item>
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
            No details found for page five
            </p>
          </div>
        )
      }
}

export default Damagesdetails