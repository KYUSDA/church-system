import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const Mjini = () => {
	return (
		<div>
			<GlobalStyle />
		<Home />
		</div>
	);
};
export default Mjini