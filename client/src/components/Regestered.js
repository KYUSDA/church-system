import React from 'react';
import {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import {axios} from 'axios';
const useStyles = makeStyles((theme)=>({
    regestered:{
        display:'flex',
        // width:'90%',
        flex:'1',
        flexWrap:"wrap",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        margin:"15px auto"
    },
    details:{
        backgroundColor:'teal',
        margin:"5px",
        borderRadius:"15px",
        transitionDelay:'0.5s',
        transition:'1s ease',
        '&:hover':{
            boxShadow:"2px 5px #888888",
            padding:'3px 0px'
        },
        
    },
    
    item:{
        padding:"5px",

    }

}))
function Regestered(props) {
    const [data,setData] = useState("");
const classes = useStyles();

useEffect(()=>{
const getMembers = async()=>{
const baseUrl = `http://localhost:5000/api/v1/admin/getmembers`
const resp = await fetch(baseUrl);
const newdata = await resp.json();
setData(newdata)
    };
getMembers();
},[props.id])
   
if(data){
    console.log(data);
    return (
        <div className={classes.regestered}>
            {data.regesterd.map((item=>(
                <div className={classes.details}>
        <div className={classes.item}>Name:{item.name}</div>
        <div className={classes.item}>Email:{item.email}</div>
        <div className={classes.item}>Course:{item.course}</div>
        <div className={classes.item}>Year:{item.year}</div>
        <div className={classes.item}>REGNO:{item.regno}</div>
        </div>
            )))}
        </div>
      )
}else{
    return(
        <div> NO MEMBER HAS REGESTERED</div>
    )
}

}

export default Regestered