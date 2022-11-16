import React from 'react';
import { Button, NoRightPaddingContainer } from '../../styles/Common.style';
import { H1, Para } from '../../styles/Typography.style';
import {
	HeroWrapper,
	HeroContent,
	HeroImage,
	HeroContentWrapper,
} from './Hero.style';
import HeroImg from '../../images/image-mockups.png';

const Hero = () => {
	return (
		<div>
			<NoRightPaddingContainer>
				<HeroWrapper>
					<HeroContent>
						<HeroContentWrapper>
							<H1>Welcome to Diaspora A family</H1>
							<Para>
			We are located just next to Kilele tution block , it covers areas on the left side of the murram road
			include the following areas  Imani ,Kangu, Geomar etc ... 
							</Para>
							{/* <Button>Request Invite</Button> */}
						</HeroContentWrapper>
					</HeroContent>
					<HeroImage>
						{/* <img src={HeroImg} alt='hero' /> */}
					</HeroImage>
				</HeroWrapper>
			</NoRightPaddingContainer>
		</div>
	);
};

export default Hero;
