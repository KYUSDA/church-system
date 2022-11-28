import React from 'react';
import { FooterButton, FooterLinks, FooterWrapper } from './Footer.style';
import logo from '../../images/logo.svg';
import iconFb from '../../images/icon-facebook.svg';
import iconTwitter from '../../images/icon-twitter.svg';
import iconYoutube from '../../images/icon-youtube.svg';
import iconPinterest from '../../images/icon-pinterest.svg';
import { Button, Container } from '../../styles/Common.style';
import { Link } from 'react-router-dom';
import kyusdaImage from '../../images/kyusda logo.jpg';
import imgLogo from '../../../../../assets/kyusda logo.png';

const Footer = () => {
	return (
		<div>
			<FooterWrapper>
				<Container>
					<div className='footer_inner'>
						<FooterLinks>
							<div className='footer-top'>
								<div className='logo'>
	{/* <img src={kyusdaImage} alt='' 
	style={{height:'100px',width:'100px'}} /> */}
								<img src={imgLogo}  alt='kyusda image' style={{height:"100px",width:'80px'}}/>				
								</div>
								<div className='social-icons'>
								<a href='https://www.facebook.com/profile.php?id=100083015178066' target='_blank'>
									<img src={iconFb} alt='' />
									</a>
							<a href='https://www.youtube.com/@kyusdachurch9822' target='_blank'>
							<img src={iconYoutube} alt='' />
							</a>
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
					</div>
				</Container>
			</FooterWrapper>
		</div>
	);
};

export default Footer;
