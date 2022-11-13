import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import React, { useState, useEffect } from "react";
  import { Link as RouterLink } from "react-router-dom";
  import Cookies from 'universal-cookie';
  import { useLogout } from "../../hooks/userLogouthook";
  import { useAuthContext } from "../../context/useAuthcontext";
  //get the jwt 
  //check for the validity ,pass via link
 
  const headersData = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Member",
      href: "/signin",
    },
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
  
  export default function Header() {
    const {logout} = useLogout();
    const {user} = useAuthContext();
    const cookies = new Cookies();
    let myTk = cookies.get('jwt');
    console.log(myTk);
    const { header, logo, menuButton, toolbar, drawerContainer ,logOut } = useStyles();
    const handleLogout = ()=>{
      console.log('logged out');
      logout()
    }
    const [state, setState] = useState({
      mobileView: false,
      drawerOpen: false,
    });
  
    const { mobileView, drawerOpen } = state;
  
    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 900
          ? setState((prevState) => ({ ...prevState, mobileView: true }))
          : setState((prevState) => ({ ...prevState, mobileView: false }));
      };
  
      setResponsiveness();
  
      window.addEventListener("resize", () => setResponsiveness());
  
      return () => {
        window.removeEventListener("resize", () => setResponsiveness());
      };
    }, []);
  
    const displayDesktop = () => {
      return (
        <Toolbar className={toolbar}>
{
            user && (
              <div>
              {Kyusda}
              <div>{getMenuButtons()}</div>
              <div>{user.email}</div>
              <div className={logOut}>{logOutbutton}</div>
              </div>
            )
          }
          {
            !user && (
              <div>
                 {Kyusda}
              <div>{getMenuButtons()}</div>
          {/* <div>{userEmail}</div> */}
          {/* <div className={logOut}>{logOutbutton}</div> */}
              </div>
            )
          }
        </Toolbar>
      );
    };
  
    const displayMobile = () => {
      const handleDrawerOpen = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
      const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
  
      return (
        <Toolbar>
 <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
              {
            user && (
              <div>
           <div className={drawerContainer}>{getDrawerChoices()}</div>
              <div>{user.email}</div>
              <div className={logOut}>{logOutbutton}</div>
              </div>
            )
          }
          {
            !user && (
              <div>
              <div className={drawerContainer}>{getDrawerChoices()}</div>
                 {/* <div>{userEmail}</div> */}
                 {/* <div className={logOut}>{logOutbutton}</div> */}
                 </div>
            )
          }
           
          </Drawer>
        </Toolbar>
      );
    };
  
    const getDrawerChoices = () => {
      return headersData.map(({ label, href }) => {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
              state:{token:myTk}
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
      });
    };
  
    const Kyusda = (
      <Typography variant="h6" component="h1" className={logo}>
    KYUSDA
      </Typography>
    );

const logOutbutton = (
  <Typography  onClick={()=>handleLogout()}>
  LOGOUT
  </Typography>
)

// const userEmail = (
//   <Typography>
// {user.email}
//   </Typography>
// )
  
    const getMenuButtons = () => {
      return headersData.map(({ label, href }) => {
        return (
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
              className: menuButton,
            }}
          >
            {label}
          </Button>
        );
      });
    };
  
    return (
      <header>
        <AppBar className={header}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
    );
  }