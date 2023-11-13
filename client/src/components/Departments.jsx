import React from 'react'
import GetDepartments from '../components/Work/Departments';
import MainFooter from './Footer/MainFooter';
import Header from './Navbar/Header';
const Departments = () => {
    return (
        <div>
            <Header />
            <GetDepartments />
            <MainFooter />
        </div>
    )
}

export default Departments