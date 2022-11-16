import React from 'react';
import {
	ArticleWrapper,
	ArticleGrid,
	ArticleCard,
	ArticleCardContent,
} from './Articles.style';
import { Container } from '../../styles/Common.style';
import MoneyImg from '../../images/image-currency.jpg';
import { H2, H4, H5, Para } from '../../styles/Typography.style';
import family1 from '../../images/family1.avif'
import family2 from '../../images/family2.avif'
import family3 from '../../images/family3.jpg'
import family4 from '../../images/family4.jpg'
const Articles = () => {
	return (
		<div>
			<Container>
				<ArticleWrapper>
					<H2 style={{textAlign:'center'}}>Members Testimonies</H2>
					<ArticleGrid>
						<ArticleCard>
							<img src={family1} alt='' />
							<ArticleCardContent>
								<H5 
							style={{fontSize:'20px',fontStyle:'italic'}}>Sarah</H5>
								<H4>
									Fourt year Student
								</H4>
								<Para>
								It is always a blessing meeting up and sharing about Jesus christ
								</Para>
							</ArticleCardContent>
						</ArticleCard>
						<ArticleCard>
							<img src={family2} alt='' />
							<ArticleCardContent>
								<H5 style={{fontSize:'20px',fontStyle:'italic'}}>
								Delphine</H5>
								<H4>
						    Fourth year student 
								</H4>
								<Para>
								Family meetings have made me have a deeper understanding about the church and God
								</Para>
							</ArticleCardContent>
						</ArticleCard>
						<ArticleCard>
							<img src={family3} alt='' />
							<ArticleCardContent>
								<H5 style={{fontSize:'20px',fontStyle:'italic'}}>
						 Samuel Kamotho</H5>
								<H4>
						   Allumni
								</H4>
								<Para>
								I do miss the joy of having brothers and sisters in christ.
								</Para>
							</ArticleCardContent>
						</ArticleCard>
						<ArticleCard>
							<img src={family4} alt='' />
							<ArticleCardContent>
								<H5 style={{fontSize:'20px',fontStyle:'italic'}}>
								Fabian</H5>
								<H4>
						  Alumni
								</H4>
								<Para>
								It is during my time where i used to share and encourage more bible study on sundays
								</Para>
							</ArticleCardContent>
						</ArticleCard>
					</ArticleGrid>{' '}
				</ArticleWrapper>
			</Container>
		</div>
	);
};

export default Articles;
