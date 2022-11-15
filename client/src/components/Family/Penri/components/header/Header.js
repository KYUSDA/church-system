import React, { useState } from 'react';
import { Navigation, Nav, Ul, Li, Logo } from './Header.style';
import logo from '../../images/kyusda logo.jpg';
import { Link } from 'react-router-dom';
import { Button, Container } from '../../styles/Common.style';
import hamburger from '../../images/icon-hamburger.svg';
import close from '../../images/icon-close.svg';
const Header = () => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<div>
			<Container>
				<Navigation>
					<Nav>
						<Logo>
				<p style={{fontSize:"20px"}}>Penri Family</p>
						</Logo>
						<Ul className={open ? `active` : `navlinks`}>
							<Li>
								<Link to={`/#home`}>Home</Link>
							</Li>
							<Li>
								<Link to={`/#departments`}>Departments</Link>
							</Li>
							<Li>
								<Link to={`/#families`}>Families</Link>
							</Li>
						</Ul>
						<Button>Login</Button>
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
