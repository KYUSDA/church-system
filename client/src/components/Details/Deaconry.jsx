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
import Deaco from '../../components/Details/Deaconry/Blog'


const Deaconry = ()=>{
  return (
    <div>
    <Deaco />
    </div>
  )
}
export default Deaconry