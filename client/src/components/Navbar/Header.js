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
  import { Link as RouterLink } from "react-router-dom";
  import Cookies from 'universal-cookie';
  import { useLogout } from "../../hooks/userLogouthook";
  import { useAuthContext } from "../../context/useAuthcontext";
  import './Navbar.scss';
  //get the jwt 
  //check for the validity ,pass via link
  import { Link, animateScroll as scroll } from "react-scroll";
  import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

  
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
        {/* <img src={images.logo} alt="logo" /> */}
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
  <a href="/signin" style={{color:"black",fontSize:"20px",fontWeight:"bolder",textDecoration:"none"}}>Member</a>
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
  <a href="/signin" style={{color:"black",fontSize:"20px",fontWeight:"bolder",textDecoration:"none"}}>Member</a>
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

  
//   export default function Header() {
//     const {logout} = useLogout();
//     const {user} = useAuthContext();
//     const cookies = new Cookies();
//     let myTk = cookies.get('jwt');
//     console.log(myTk);
//     const { header, logo, menuButton, toolbar, drawerContainer ,logOut } = useStyles();
//     const handleLogout = ()=>{
//       console.log('logged out');
//       logout()
//     }
//     const [state, setState] = useState({
//       mobileView: false,
//       drawerOpen: false,
//     });
  
//     const { mobileView, drawerOpen } = state;
  
//     useEffect(() => {
//       const setResponsiveness = () => {
//         return window.innerWidth < 900
//           ? setState((prevState) => ({ ...prevState, mobileView: true }))
//           : setState((prevState) => ({ ...prevState, mobileView: false }));
//       };
  
//       setResponsiveness();
  
//       window.addEventListener("resize", () => setResponsiveness());
  
//       return () => {
//         window.removeEventListener("resize", () => setResponsiveness());
//       };
//     }, []);
  
//     const displayDesktop = () => {
//       return (
//         <Toolbar className={toolbar}>
// {
//             user && (
//               <div>
//               {Kyusda}
//               <div>{getMenuButtons()}</div>
//               <div>{user.email}</div>
//               <div className={logOut}>{logOutbutton}</div>
//               </div>
//             )
//           }
//           {
//             !user && (
//               <div>
//                  {Kyusda}
//               <div>{getMenuButtons()}</div>
//               </div>
//             )
//           }
//         </Toolbar>
//       );
//     };
  
//     const displayMobile = () => {
//       const handleDrawerOpen = () =>
//         setState((prevState) => ({ ...prevState, drawerOpen: true }));
//       const handleDrawerClose = () =>
//         setState((prevState) => ({ ...prevState, drawerOpen: false }));
  
//       return (
//         <Toolbar>
//  <IconButton
//             {...{
//               edge: "start",
//               color: "inherit",
//               "aria-label": "menu",
//               "aria-haspopup": "true",
//               onClick: handleDrawerOpen,
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Drawer
//             {...{
//               anchor: "left",
//               open: drawerOpen,
//               onClose: handleDrawerClose,
//             }}
//           >
//               {
//             user && (
//               <div>
//            <div className={drawerContainer}>{getDrawerChoices()}</div>
//               <div>{user.email}</div>
//               <div className={logOut}>{logOutbutton}</div>
//               </div>
//             )
//           }
//           {
//             !user && (
//               <div>
//               <div className={drawerContainer}>{getDrawerChoices()}</div>
//                  {/* <div>{userEmail}</div> */}
//                  {/* <div className={logOut}>{logOutbutton}</div> */}
//                  </div>
//             )
//           }
           
//           </Drawer>
//         </Toolbar>
//       );
//     };
  
//     const getDrawerChoices = () => {
//       return headersData.map(({ label, href }) => {
//         console.log(href)
//         return (
//           <Link
//             {...{
//               component: RouterLink,
//               to: href,
//               color: "inherit",
//               style: { textDecoration: "none" },
//               key: label,
//               state:{token:myTk}
//             }}
//           >
//             <MenuItem>{label}</MenuItem>
//           </Link>
//         );
//       });
//     };
  
//     const Kyusda = (
//       <Typography variant="h6" component="h1" className={logo}>
//     KYUSDA
//       </Typography>
//     );

// const logOutbutton = (
//   <Typography  onClick={()=>handleLogout()}>
//   LOGOUT
//   </Typography>
// )

// // const userEmail = (
// //   <Typography>
// // {user.email}
// //   </Typography>
// // )
  
//     const getMenuButtons = () => {
//       return headersData.map(({ label, href }) => {
//         return (
//           <Button
//             {...{
//               key: label,
//               color: "inherit",
//               to: href,
//               component: RouterLink,
//               className: menuButton,
//             }}
//           >
//             {label}
//           </Button>
//         );
//       });
//     };
  
//     return (
//       <header>
//         <AppBar className={header}>
//           {mobileView ? displayMobile() : displayDesktop()}
//         </AppBar>
//       </header>
//     );
//   }