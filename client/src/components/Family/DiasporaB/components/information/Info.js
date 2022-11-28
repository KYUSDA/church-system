import React from 'react';
import { Container } from '../../styles/Common.style';
import { H2, H3, Para } from '../../styles/Typography.style';
import { InfoCard, InfoGrid, InfoHeader, InfoWrapper } from './Info.style';
import BankingIcon from '../../images/icon-online.svg';
import BudgetingIcomn from '../../images/icon-budgeting.svg';
import Onboarding from '../../images/icon-onboarding.svg';
import Api from '../../images/icon-api.svg';
import profile from '../../../../../assets/Eldersam.jpg';
const Info = () => {
	return (
		<div>
			<InfoWrapper>
				<Container>
					<InfoHeader>
						<H2 style={{marginTop:'20px'}}>
							We always love showing brotherly and sister love
						</H2>
						<Para>
							{' '}
							We do have our sunday meeting at 2pm then a weekly meetup as from 4pm	
						</Para>
					</InfoHeader>
					<p style={{
					textAlign:'center',
					fontSize:'20px',
					fontWeight:'bolder',
					marginTop:'20px'}}>
					 OUR LEADERS</p>
					<InfoGrid>
						<InfoCard>
							<img src={profile} alt='' />
							<H3>Elder Samuel Omweri</H3>
							<p>Elder in charge</p>
							<Para>
							Welcome to Diaspora B family ,not only should we 
								worship on sababth but also during weekday
							</Para>
						</InfoCard>
						<InfoCard>
							<img src={BudgetingIcomn} alt='' />
							<H3>Bevon Ocharo</H3>
							<p>Family leader</p>
							<Para>
							Well its an interesting family
I love the way we are united😊
							</Para>
						</InfoCard>
					</InfoGrid>
				</Container>
			</InfoWrapper>
		</div>
	);
};

export default Info;
