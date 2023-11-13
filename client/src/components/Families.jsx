import React from 'react'
import { Families } from '../components/Family/Families';
import Header from './Navbar/Header';
import FamilyFAQ from './Family/FAQ/FamilyFAQ';
import MainFooter from './Footer/MainFooter';
const AllFamilies = () => {
    return (
        <div>
            <Header />
            <Families />
            <FamilyFAQ />
            <MainFooter />
        </div>
    )
}

export default AllFamilies