import React from 'react';
import { FooterButton, FooterLinks, FooterWrapper } from './Footer.style';
import logo from '../../images/logo.svg';
import iconFb from '../../images/icon-facebook.svg';
import iconTwitter from '../../images/icon-twitter.svg';
import iconYoutube from '../../images/icon-youtube.svg';

import { Button, Container } from '../../styles/Common.style';
import { Link } from 'react-router-dom';
import kyusdaImage from '../../images/kyusdalogo.jpg';
const Footer = () => {
	return (
		<div>
			<FooterWrapper>
				<Container>
					<div className='footer_inner'>
						<FooterLinks>
							<div className='footer-top'>
								<div className='logo'>
	<img src={kyusdaImage} alt='' 
	style={{height:'100px',width:'100px'}} />
	<Button>KYUSDA</Button>
								{kyusdaImage}
								</div>
								<div className='social-icons'>
									<img src={iconFb} alt='' />
									<img src={iconTwitter} alt='' />
									<img src={iconYoutube} alt='' />
								</div>
							</div>
							<div className='link'>
								<Link to='/#home'>Home</Link>
								<Link to='/#about'>About</Link>
								<Link to='/#departments'>Departments</Link>
								<Link to='/#families'>Families</Link>
							</div>
							<div className='link'>
								<Link to='/#contact'>Support</Link>
								<Link to='/#contact'>Help</Link> <Link to='/contact'>Contact</Link>
							</div>
						</FooterLinks>
						<FooterButton>
							<Button>Login</Button>
						</FooterButton>
					</div>
				</Container>
			</FooterWrapper>
		</div>
	);
};

export default Footer;
