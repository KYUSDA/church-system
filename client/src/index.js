import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {useState,useEffect} from 'react';
import Cookies from 'universal-cookie';
import { AuthContextProvider } from './context/authcontext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
 <AuthContextProvider>
 <Home />
 </AuthContextProvider>
  </BrowserRouter>
);
reportWebVitals();
