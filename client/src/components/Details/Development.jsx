import React,{useState,useEffect} from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.css";
import Navbar from '../Navbar/Navbar'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import sprite from "../../assets/sprite.svg";
import DetailsFooter from "./DetailsFooter";
import {useLocation} from 'react-router-dom';
const images = [
  "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg",
"https://res.cloudinary.com/ifeomaimoh/image/upload/v1652366604/demo_image5.jpg",
 "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345874/demo_image1.jpg",
];

const Development = ()=>{
const [name,setname] = useState();
const [elder,setElder] = useState();
const [head,setHead] = useState();
const [event,setEvent] = useState();
const [project,setproject] = useState();
  const location = useLocation();
  console.log(location.pathname);
  const departmentName = location.pathname.split('/')[2]
  console.log(departmentName)
  useEffect(()=>{
      const getDepartmentDetails = async()=>{
      const url = `http://localhost:8000/kyusda/v1/departments/getDetails`
      const resp = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({departmentName}),
        credentials:'include',
        withCredentials:true
      })
      const {data} = await resp.json();
console.log(data)
if(data){
  setname(data.name);
  setElder(data.elder);
  setHead(data.head);
  setproject(data.project);
  setEvent(data.event)
}
}
    getDepartmentDetails()
        },[])

  const rotateAnimationHandler = (props, state) => {
    const transitionTime = props.transitionTime + "ms";
    const transitionTimingFunction = "ease-in-out";
    let slideStyle = {
      display: "block",
      minHeight: "100%",
      transitionTimingFunction: transitionTimingFunction,
      msTransitionTimingFunction: transitionTimingFunction,
      MozTransitionTimingFunction: transitionTimingFunction,
      WebkitTransitionTimingFunction: transitionTimingFunction,
      OTransitionTimingFunction: transitionTimingFunction,
      transform: `rotate(0)`,
      position:
        state.previousItem === state.selectedItem ? "relative" : "absolute",
      inset: "0 0 0 0",
      zIndex: state.previousItem === state.selectedItem ? "1" : "-2",
      opacity: state.previousItem === state.selectedItem ? "1" : "0",
      WebkitTransitionDuration: transitionTime,
      MozTransitionDuration: transitionTime,
      OTransitionDuration: transitionTime,
      transitionDuration: transitionTime,
      msTransitionDuration: transitionTime,
    };
    return {
      slideStyle,
      selectedStyle: {
        ...slideStyle,
        opacity: 1,
        position: "relative",
        zIndex: 2,
        filter: `blur(0)`,
      },
      prevStyle: {
        ...slideStyle,
        transformOrigin: " 0 100%",
        transform: `rotate(${
          state.previousItem > state.selectedItem ? "-45deg" : "45deg"
        })`,
        opacity: "0",
        filter: `blur( ${
          state.previousItem === state.selectedItem ? "0px" : "5px"
        })`,
      },
    };
  };

  return (
    <div className="health">
      <h4 style={{textAlign:"center",marginTop:"100px"}}>Welcome to  {name} Department </h4>
      <Navbar />
      <Box sx={{ flexGrow: 1 }} marginTop="50px">
      <Grid container spacing={2} direction="row" justifyContent="center"  alignItems="flex-start">
        <Grid item xs={12} md={8} >
        <div className="box">
     <Carousel useKeyboardArrows={true}
      showIndicators
      renderArrowNext={(clickHandler, hasNext) => {
        return (
          hasNext && (
            <button className="nav_btn nav_btn_right" onClick={clickHandler}>
              <svg>
                <use xlinkHref={sprite + "#right"}></use>
              </svg>
            </button>
          )
        );
      }}
      renderArrowPrev={(clickHandler, hasNext) => {
        return (
          hasNext && (
            <button onClick={clickHandler} className="nav_btn nav_btn_left">
              <svg>
                <use xlinkHref={sprite + "#left"}></use>
              </svg>
            </button>
          )
        );
      }}
      renderIndicator={(clickHandler, isSelected, index) => {
        return (
          <li
            onClick={clickHandler}
            className={`ind ${isSelected ? "active" : ""}`}
            key={index}
            role="button"
          />
        );
      }}
      statusFormatter={(currentItem, total) => {
        return (
          <div>
image {currentItem} of {total}
          </div>
         
        );
      }}
      transitionTime={310}
      animationHandler={rotateAnimationHandler}
      swipeable={false} 
     >
        {images.map((URL, index) => (
          <div className="slide">
            <img alt="sample_file" src={URL} key={index} className='myslider'/>
            </div>
            ))}
       </Carousel>
    </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div>
            <p>The department is comprised of 5 members <br /> headed by  
            {elder}
            </p>
            <p style={{marginTop:"3px"}}>The chairman is {head} </p>
          </div>
          <h3 style={{margin:"10px" ,textDecoration:"underline"}}>Department Members</h3>
        </Grid>
        </Grid>
        <Grid container spacing={2} direction="row" justifyContent="center"  alignItems="flex-start">
<Grid item xs={8} marginTop="200px">
    <h3 style={{margin:"10px" ,textDecoration:"underline"}}>About the Department</h3>
    <p style={{marginLeft:'10px'}}>
    The Seventh-day Adventist Church believes that the gospel not only gives us <br />
    eternal hope, but it improves the quality of our life in the present. <br />
    The principles and precepts of God’s Word hold the secrets of the abundant life.<br />
     Physical, Mental, and Spiritual health are not accident. There are divine prescriptions <br />
     that if applied will improve the quality and length of life. Seventh-day Adventists,<br />
     on the whole, live almost one decade longer than their western counterparts.
    </p>
    </Grid>
    <Grid item xs={4} marginTop="200px">
    <h3 style={{margin:"10px" ,textDecoration:"underline"}}>Upcoming Events & Projects</h3>
    <p>{project}</p>
    <p>{event}</p>
    </Grid>
        </Grid>
    </Box>
    <DetailsFooter />
    </div>
  )
}
export default Development