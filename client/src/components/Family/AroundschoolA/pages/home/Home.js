import React from 'react';
import Articles from '../../components/articles/Articles';
import Hero from '../../components/hero/Hero';
import Info from '../../components/information/Info';
import Header  from '../../components/header/Header';
import Footer from '../../components/footer/Footer'
import { HomeContainer } from './Home.style';

const Home = () => {
	return (
		<div>
			<HomeContainer>
				<Header />
				<Hero />
				<Info />
				<Articles />
                <Footer />
			</HomeContainer>
		</div>
	);
};

export default Home;
