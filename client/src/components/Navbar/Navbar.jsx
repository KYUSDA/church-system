import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import  Header from './Header'
function Navbar() {
    // <div className='navbar'>
    //   <div>
    //     <h2>LOGO</h2>
    //     </div>
    //   <Link to='/' className='navlinks' 
    //     style={{textDecoration:'none'}}>Home</Link>
    //     <Link to='admin' className='navlinks' 
    //     style={{textDecoration:'none'}}>Admin</Link>
    //     <Link to='member' className='navlinks'
    //     style={{textDecoration:'none'}}
    //     >Member</Link>
    // </div>
    return (
      <div className="App">
        <Header/>
      </div>
    );

}

export default Navbar