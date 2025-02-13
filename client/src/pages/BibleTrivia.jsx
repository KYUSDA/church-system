import React from 'react'
import NavBar from './Member/NavBar'
import { useAuthContext } from '../context/useAuthcontext';
const BibleTrivia = () => {
    const { user } = useAuthContext();
    return (
        <div className='max-w-7xl mx-auto p-8'>
            <NavBar user={user} />
            <h1 className='absolute text-center text-3xl font-bold mt-10 top-[10%]'>Bible trivia coming soon</h1>
        </div>
    )
}

export default BibleTrivia
