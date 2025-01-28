import React from 'react'
import Header from '../Navbar/Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <>
    <Header />

    {children}

    <Footer />
    </>
  )
}

export default Layout