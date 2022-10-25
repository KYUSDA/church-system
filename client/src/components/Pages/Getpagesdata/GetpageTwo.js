import React from 'react'
import {useState,useEffect} from 'react'
import {makeStyles} from '@material-ui/core';
import {useLocation} from 'react-router-dom';
function GetpageTwo(props) {
    const [pageTwo,setpageTwo] = useState();
    const location = useLocation();
    const {email} = location.state
    useEffect(()=>{
        const getPageTwo = async(props)=>{
            const url = `http://localhost:8080/api/v1/member/getpagetwo`;
            const resp = await fetch(url,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email}),
            credentials: 'include',
            withCredentials:true
             });
        const newdata = await resp.json();
        setpageTwo(newdata);
              }
              getPageTwo();
    },[props.id]);
    if(pageTwo){
        return (
          <div className='mydata'>
{
   pageTwo.pageTwodata.map(item=>(
    <div className='pageTwodata' 
    key={item._id}>
      <h1>Details of the insured Vehicle</h1>
        <div>Brand:{item.age}</div>
        <div>Date Purchased:{item.datepurch}</div>
        <div>Owner of Goods:{item.goodsOwner}</div>
        <div>Hauled:{item.hauled}</div>
        <div>Car Horse power:{item.horsepw}</div>
        <div>Where abouts of the vehicle:{item.knowledge}</div>
        <div>Car model:{item.make}</div>
        <div>Mileage at Time of accident:{item.mileage}</div>
        <div>What was the nature of vehicle before accident:
          {item.nature}</div>
        <div>Car Order:{item.order}</div>
        <div>Any passenger:{item.passenger}</div>
        <div>Car price:{item.price}</div>
        <div>purposeVehicle:{item.purposeVehicle}</div>
    </div>
      ))
}
          </div>
        )
    }
}

export default GetpageTwo