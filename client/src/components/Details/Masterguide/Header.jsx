import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useAuthContext} from '../../../context/useAuthcontext';
import {useLogout} from '../../../hooks/userLogouthook'
import {makeStyles} from '@material-ui/core';
const useStyles = makeStyles(()=>({
  logOut:{
    color: 'crimson',
    border: '2px solid crimson',
    padding: '6px 10px',
    borderRadius: '4px',
    fontFamily: "Poppins",
    cursor: 'pointer',
    fontSize: '1em'
  }
}))
function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;
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
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">
          <a href='/'>
            Masterguide Department
          </a>
          </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >

        </Typography>
        {
          user  &&(
            <div>
            <Button variant="outlined" size="small">
            {user.email}
          </Button>
          <Button className={classes.logOut}>
 {logOutbutton}
          </Button>
            </div>
          )
        }
        {
          !user && (
            <Button variant="outlined" size="small">
              <a href='signin'>
                Sign In
              </a>
          </Button>
          )
        }
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;