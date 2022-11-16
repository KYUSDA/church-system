import React, { useState } from 'react';
import { Navigation, Nav, Ul, Li, Logo } from './Header.style';
import { Link } from 'react-router-dom';
import { Button, Container } from '../../styles/Common.style';
import hamburger from '../../images/icon-hamburger.svg';
import close from '../../images/icon-close.svg';
import {useLogout} from '../../../../../hooks/userLogouthook';
import { useAuthContext } from '../../../../../context/useAuthcontext';
const Header = () => {
	const  {logout} = useLogout();
	const {user} = useAuthContext();
	const [open, setOpen] = useState(false);

	const handleLogout = ()=>{
		console.log('logged out');
		logout()
	  }

	  const logOutbutton = (
		<Button onClick={()=>handleLogout()} style={{margin:"3px",cursor:'pointer'}}>
		LOGOUT
		</Button>
	  )

	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<div>
			<Container>
				<Navigation>
					<Nav>
						<Logo>
				<p style={{fontSize:"30px" , fontWeight:'bolder'}}>
					<a href='/'>Garden Estate Family</a>
				</p>
						</Logo>
					{
user&& (
	<div>
         <Button>{user.email}</Button>
		 {logOutbutton}
	</div>
)

					}

{
!user && (
<Button style={{margin:"3px"}}>
	<a href='/signin' style={{fontSize:"20px" ,cursor:"pointer" ,color:'red'}}>
	Login
	</a>	
	</Button>
)
}


						
						<img
							src={open ? close : hamburger}
							className='hamburger'
							alt=''
							onClick={handleClick}
						/>
					</Nav>
				</Navigation>
			</Container>
		</div>
	);
};

export default Header;
