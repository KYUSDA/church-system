import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
//load data we are pasing via prop
//fecth data from mongo db.

function DepartmentsDetails() {
    const location = useLocation();
    console.log(location);
    const getName  = location.pathname.split(':');
console.log(getName[1])
useEffect(()=>{

},[])
  return (
<div>Welcome to {getName[1]}</div>
  )
}

export default DepartmentsDetails