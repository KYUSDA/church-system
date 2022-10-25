import React from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg"
import image3 from "../../assets/image3.jpg"
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  btn:{
    padding:"10px",
    color:"black",
    textDecoration:"none",
    textTransform:"uppercase",
    fontSize:"18px",
    fontWeight:"700",
    textDecoration:"none",
    backgroundColor:theme.palette.secondary.main,
    '&:hover':{
         backgroundColor:' rgba(102, 255, 0, 0.986)'
    }
}
}))

const CarouselContainer = () => {
  
  return (
  
<Carousel>
  <Carousel.Item >
    <img
      className="d-block w-100"
      src={image1}
      alt="First slide"
    />
    <Carousel.Caption>
      <div className="flexslider-caption">
      <h3>EXPERIENCE GOD'S</h3>
<h1>UNCEASING PROVISION</h1>
<p>JOIN US</p>
      </div>
 
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image2}
      alt="Second slide"
    />
    <Carousel.Caption>
      <div className="flexslider-caption">
      <h2>True Worship Experience</h2>

<p className="lead">But the hour is coming,and now is here,when the true worshipers wil
  worship the Father in spirit and truth;for the father is seeking such to worship him.. <em>John 4:23</em></p>
  <p>LEARN MORE</p>

      </div>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image3}
      alt="Third slide"
    />
    <Carousel.Caption>
   <div className="flexslider-caption">
   <h2>Grace and Truth</h2>
<p className="lead">For God did not send his Son into the world to condemn
 the world, but to save the world through him. <em>John 3:17</em></p>
<p>GAllERY</p>
   </div>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

  )
}

export default CarouselContainer;
