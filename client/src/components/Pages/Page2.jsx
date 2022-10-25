import React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import "../Navbar/Navbar.css";
import {useLocation,Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  ptext: {
    textAlign: "center",
    textTransform: "uppercase",
    margin: "20px auto",
    color: "orange",
    fonSize: "25px",
  },
  btn: {
    margin: "200px auto",
    bottom: "0px",
  },
  textFields: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  claimerror: {
    backgroundColor: "red",
  },
  item: {
    margin: "20px 20px",
  },
  btn: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "crimson",
    },
  },
  clear: {
    margin: "150px 15px",
    backgroundColor: "pink",
    cursor: "pointer",
    padding: "10px",
    "&:hover": {
      backgroundColor: "crimson",
    },
  },
}));
const PageTwo = (props) => {
  const location = useLocation();
  const {email} = location.state;
  const {formId} = location.state;
  console.log(email,formId);
  const [make, setmake] = useState("");
  const [horsepw, sethorsepw] = useState("");
  const [regno, setregno] = useState("");
  const [price, setprice] = useState("");
  const [yearmanu, setyearmanu] = useState("");
  const [datepurch, setdatepurch] = useState("");
  const [age, setage] = useState("");
  const [purposeVehicle, setPurpose] = useState("");
  const [stateVehicle,setstateVehicle] = useState("");
  const [order, setorder] = useState("");
  const [mileage, setMileage] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [passenger, setPassenger] = useState("");
  const [hauled, setHauled] = useState("");
  const [nature, setnatureGoods] = useState("");
  const [weight, setweight] = useState("");
  const [goodsOwner, setgoodsOwner] = useState("");
  const [emailUser,setemailUser] = useState(email);
  const [formIdUser,setformIdUser] = useState(formId);
  const classes = useStyles();
  const nav = useNavigate();

//fecth data  check for the id in database if matches with
useEffect(()=>{
  const getData = async()=>{
    const dburl =`http://localhost:8080/api/v1/form/pageTwo`;
    const resp = await fetch(dburl,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      formIdUser
  })
    });
    const data = await resp.json();
    console.log(data.getPagedata);
    if(data.getPagedata == null){
      console.log('is null no data')
    }else{
      // data.getPagedata.map((item)=>{
        setmake(data.getPagedata.make);
        sethorsepw(data.getPagedata.horsepw);
      setregno(data.getPagedata.regno);
      setprice(data.getPagedata.price);
      setyearmanu(data.getPagedata.yearmanu);
      setdatepurch(data.getPagedata.datepurch);
      setstateVehicle(data.getPagedata.stateVehicle);
      setorder(data.getPagedata.order);
      setPurpose(data.getPagedata.purposeVehicle)
      setMileage(data.getPagedata.mileage);
      setKnowledge(data.getPagedata.knowledge);
      setweight(data.getPagedata.weight);
   setPassenger(data.getPagedata.passenger)
   setHauled(data.getPagedata.hauled)
   setnatureGoods(data.getPagedata.nature)
   setweight(data.getPagedata.weight)
   setgoodsOwner(data.getPagedata.goodsOwner)
   setage(data.getPagedata.age);
      //  })
    }
  }
  getData();
  },[props.id]);

  //submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/v1/member/pageTwo`;
    const resp = await fetch(url,
       {
        method:"POST",
        headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        make,
        horsepw,
        regno,
        price,
        yearmanu,
        datepurch,
        age,
        purposeVehicle,
        stateVehicle,
        order,
        mileage,
        knowledge,
        passenger,
        hauled,
        nature,
        weight,
        goodsOwner,
        emailUser,
        formIdUser
      }),
    });
    const data = await resp.json();
    if(data.message){
      alert(`${data.message}`);
      // nav('/driversection')
    }
  };

  const hardReload = () => {
    console.log("refreshed");
  };

  return (
    <div className="vehicle form">
     <div className='navbar'>
{/* 
  CREATE ROUTES */}
<Link to='/personaldetails' className='navlinks' 
  state={{email:email ,formId:formId}}>
  Personal Details</Link>
  <Link to='/insuredvehicle' className='navlinks' 
 
  state={{  email:email ,formId:formId}}
  >The Insured Vehicle</Link>
  <Link to='/driversection' className='navlinks'
 
  state={{ email:email ,formId:formId}}
  >Person Driving Section</Link>
  <Link to='/accidents' className='navlinks'
 
  state={{  email: email ,formId:formId}}
  >Accident</Link>
   <Link to='/damages' className='navlinks'
 
  state={{ email:email ,formId:formId}}
  >Damages</Link>
</div>
      <h2 className={classes.ptext}>Insured Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.textFields}>
          <div className={classes.item}>
            <TextField
              type="text"
              id="make"
              label="CAR MAKE"
              variant="outlined"
              required
              value={make}
              onChange={(e) => {
                setmake(e.target.value);
              }}
            />
            <div className="carerror" style={{ color: "red" }}></div>
          </div>
          <div className={classes.item}>
            <TextField
              type="text"
              id="horsepw"
              label="HORSE POWER"
              variant="outlined"
              required
              value={horsepw}
              onChange={(e) => {
                sethorsepw(e.target.value);
              }}
            />
            <div className="horsepwerror" style={{ color: "red" }}></div>
          </div>
          <div className={classes.item}>
            <TextField
              type="text"
              id="regno"
              label="REG NO"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={regno}
              onChange={(e) => {
                setregno(e.target.value);
              }}
            />
            <div className="regnoerror" style={{ color: "red" }}></div>
          </div>
        </div>

        <div className={classes.textFields}>
          <div className={classes.item}>
            <TextField
              type="text"
              id="price paid"
              label="PRICE PAID"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
            <div className="pricepaiderror" style={{ color: "red" }}></div>
          </div>
          <div className={classes.item}>
            <p>YEAR OF MANUFACTURE</p>
            <TextField
              type="date"
              id="yearmanu"
              label=""
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={yearmanu}
              onChange={(e) => {
                setyearmanu(e.target.value);
              }}
            />
            <div className="manuerror" style={{ color: "red" }}></div>
          </div>
          <div className={classes.item}>
            <p>DATE OF PURCHASE</p>
            <TextField
              type="date"
              id="datepurchase"
              label=""
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={datepurch}
              onChange={(e) => {
                setdatepurch(e.target.value);
              }}
            />
            <div className="pricepaiderror" style={{ color: "red" }}></div>
          </div>
            <div className={classes.item}>
            <p>NEW OR OLD </p>
            <TextField
              type="text"
              id="state"
              label="ENTER IF CAR WAS OLD OR NEW"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={stateVehicle}
              onChange={(e) => {
                setstateVehicle(e.target.value);
              }}
            />
            <div className="pricepaiderror" style={{ color: "red" }}></div>
          </div>
        </div>
        <div className={classes.textFields}>
          <div className={classes.item}>
            <TextField
              type="text"
              id="purpose"
              label="PURPOSE OF VEHICLE DURING ACCIDENT"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={purposeVehicle}
              onChange={(e) => {
                setPurpose(e.target.value);
              }}
            />
            <div className="purposeerror" style={{ color: "red" }}></div>
          </div>
          <div className={classes.item}>
            <TextField
              type="text"
              id="vehicleState"
              label="STATE OF VEHICLE BEFORE ACCIDENT"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={order}
              onChange={(e) => {
                setorder(e.target.value);
              }}
            />
            <div className="stateerror" style={{ color: "red" }}></div>
          </div>
          <div className={classes.item}>
            <TextField
              type="text"
              id="mileage"
              label="MILEAGE AT TIME OF ACCIDENT"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={mileage}
              onChange={(e) => {
                setMileage(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.textFields}>
          <div className={classes.item}>
            <p>Vehicle being used with your knowledge</p>
            <TextField
              type="text"
              id="knowledge"
              label="VEHICLE BEING USED WITH YOUR KNOWLEDGE"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={knowledge}
              onChange={(e) => {
                setKnowledge(e.target.value);
              }}
            />
          </div>
          <div className={classes.item}>
            <p id="passenger">if the claim is respect to motorcycle</p>
            <TextField
              type="text"
              id="passenger"
              label="pillion passenger being carried"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={passenger}
              onChange={(e) => {
                setPassenger(e.target.value);
              }}
            />
          </div>
          <div className={classes.item}>
            <p id="hauled">Claim respect to a lorry</p>
            <TextField
              type="text"
              id="hauled"
              label="Was trailer hauled"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={hauled}
              onChange={(e) => {
                setHauled(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={classes.textFields}>
          <div className={classes.item}>
            <p id="knowldege">claim respect to a lorry</p>
            <TextField
              type="text"
              id="goodState"
              label="nature of goods carried"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={nature}
              onChange={(e) => {
                setnatureGoods(e.target.value);
              }}
            />
          </div>
          <div className={classes.item}>
            <p id="owner">Claim respect to a lorry</p>
            <TextField
              type="text"
              id="weight"
              label="Weights of Goods"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={weight}
              onChange={(e) => {
                setweight(e.target.value);
              }}
            />
          </div>
          <div className={classes.item}>
            <p id="owner">Claim respect to a lorry</p>
            <TextField
              type="text"
              id="owner"
              label="Owner of Goods"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={goodsOwner}
              onChange={(e) => {
                setgoodsOwner(e.target.value);
              }}
            />
          </div>
          <div className={classes.item}>
            <p id="owner">Claim respect to a lorry</p>
            <TextField
              type="text"
              id="age"
              label="Vehicle Old or New"
              variant="outlined"
              required
              style={{ margin: "20px 0px" }}
              value={age}
              onChange={(e) => {
                setage(e.target.value);
              }}
            />
          </div>
        </div>
        <Button
          style={{ margin: "50px 15px" }}
          type="submit"
          variant="outlined"
          size="large"
          className={classes.btn}
        >
          SAVE & SUBMIT
        </Button>
        <span
          variant="outlined"
          className={classes.clear}
          onClick={(e) => {
            hardReload();
          }}
        >
          CLEAR ALL
        </span>
      </form>
    </div>
  );
};
export default PageTwo;
