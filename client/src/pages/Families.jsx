import React from 'react'
import { Families } from '../components/Family/Families';
import Header from '../components/Navbar/Header';
import FamilyFAQ from '../components/Family/FAQ/FamilyFAQ';
import MainFooter from '../components/Footer/MainFooter';
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