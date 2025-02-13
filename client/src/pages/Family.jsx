import React from 'react'
import { useAuthContext } from '../context/useAuthcontext'
import NavBar from './Member/NavBar'

const Family = () => {
    const { user } = useAuthContext();
    return (
        <div className='max-w-7xl mx-auto p-8'>
            <NavBar user={user} />
            <h1 className='absolute text-center text-3xl font-bold mt-10 top-[10%]'>Family page coming soon</h1>
        </div>
    )
}

export default Family
