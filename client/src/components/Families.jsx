import React from 'react'
import { Families } from '../components/Family/Families';
import Header from './Navbar/Header';
import { AppWrap } from '../wrapper';
const AllFamilies = () => {
    return (
        <div>
            <Header />
            <Families />
            {/* <AppWrap /> */}
        </div>
    )
}

export default AllFamilies