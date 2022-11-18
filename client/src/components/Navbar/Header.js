import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    MenuItem,
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
  import Cookies from 'universal-cookie';
  import { useLogout } from "../../hooks/userLogouthook";
  import { useAuthContext } from "../../context/useAuthcontext";
  import './Navbar.scss';
  import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Kyusda from "../../assets/kyusda logo.png";
  
  const headersData = [
    {
      label: "Home",
      href: "/",
    },
    {
    label:'Families',
    href:'families'
    },
    {
      label:'Departments',
      href:'departments'
    },
    {
      label:"Announcements",
      href:"/#announcements"
    },
    {
      label: "Member",
      href: "/signin",
    }
  ];
  
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "green",
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    logo: {
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
    },
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawerContainer: {
      padding: "20px 30px",
    },
    logOut:{
      color: 'crimson',
      border: '2px solid crimson',
      padding: '6px 10px',
      borderRadius: '4px',
      fontFamily: "Poppins",
      cursor: 'pointer',
      fontSize: '1em'
    }
  }));

  
const Header = () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
    const {user} = useAuthContext();
     const {logout} = useLogout();

         const handleLogout = ()=>{
      console.log('logged out');
      logout()
    }
     const logOutbutton = (
  <Typography  onClick={()=>handleLogout()}>
  LOGOUT
  </Typography>
)
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={Kyusda} alt="logo"  style={{height:'60px'}}/>
      </div>
      {
user && (
  <ul className="app__navbar-links">
  {['home', 'about', 'families', 'departments', 'announcements','testimonial'].map((item) => (
    <li className="app__flex p-text" key={`link-${item}`}>
      <div />
      <a href={`#${item}`}>{item}</a>
    </li>
  ))}
  <p>{user.email}</p>
  <p className={classes.logOut}>{logOutbutton}</p>
</ul>
)
}
{
!user && (
  <ul className="app__navbar-links">
  {['home', 'about', 'families', 'departments', 'announcements','testimonial'].map((item) => (
    <li className="app__flex p-text" key={`link-${item}`}>
      <div />
      <a href={`#${item}`}>{item}</a>
    </li>
  ))}
  <Link 
   to='/signIn'
   rel="noreferrer"
   style={{color:"blue",fontSize:"20px",fontWeight:"bolder",textDecoration:"none",
   width:'auto',backgroundColor:"red"}}>
  Member</Link>
</ul>
)
}



      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            {
user && (
  <ul className="app__navbar-links">
  {['home', 'about', 'families', 'departments', 'announcements','testimonial'].map((item) => (
    <li className="app__flex p-text" key={`link-${item}`}>
      <div />
      <a href={`#${item}`}>{item}</a>
    </li>
  ))}
  <p>{user.email}</p>
  <p className={classes.logOut}>{logOutbutton}</p>
</ul>
)
}
{
!user && (
  <ul className="app__navbar-links">
  {['home', 'about', 'families', 'departments', 'announcements','testimonial'].map((item) => (
    <li className="app__flex p-text" key={`link-${item}`}>
      <div />
      <a href={`#${item}`}>{item}</a>
    </li>
  ))}
  <Link 
   to='/signIn'
   rel="noreferrer"
   style={{color:"blue",fontSize:"20px",fontWeight:"bolder",textDecoration:"none",width:'auto',
   backgroundColor:"red"}}>
  Member</Link>
</ul>
)
}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Header;

