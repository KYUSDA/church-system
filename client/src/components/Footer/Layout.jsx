import React from 'react'
import MainFooter from './MainFooter'
import Header from '../Navbar/Header'

function Layout({ children }) {
  return (
    <>
    <Header />

    {children}

    <MainFooter />
    </>
  )
}

export default Layout